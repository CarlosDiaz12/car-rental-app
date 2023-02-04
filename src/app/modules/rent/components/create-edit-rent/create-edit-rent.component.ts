import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { VehicleService } from 'src/app/modules/maintenance/pages/vehicle/services/vehicle.service';
import { ClientService } from 'src/app/modules/maintenance/pages/client/services/client.service';
import { EmployeeService } from 'src/app/modules/maintenance/pages/employee/services/employee.service';
import { RentService } from '../../services/rent.service';
import { SharedService } from '../../../../shared/shared.service';
import { InspectionService } from '../../../inspection/services/inspection.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-edit-rent',
  templateUrl: './create-edit-rent.component.html',
  styleUrls: ['./create-edit-rent.component.scss'],
})
export class CreateEditRentComponent implements OnInit {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  ddlVehicleValues: any[] = [];
  ddlClientValues: any[] = [];
  ddlEmployeeValues: any[] = [];
  isEditing: boolean = false;
  isDateValid: boolean = false;
  hasInspection: boolean = false;
  constructor(
    private service: RentService,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private sharedService: SharedService,
    private inspectionService: InspectionService,
    public dialogRef: MatDialogRef<CreateEditRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fillDropdown();
    if (this.data.id) {
      this.action = 'Editar';
      this.isEditing = true;
    }
    this.dataForm = this.fb.group({
      vehicleId: new FormControl(this.data.vehicleId, [Validators.required]),
      clientId: new FormControl(this.data.clientId, [Validators.required]),
      employeeId: new FormControl(this.data.employeeId, [Validators.required]),
      rentDate: new FormControl(
        formatDate(this.data.rentDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ),
      returnDate: new FormControl(
        formatDate(this.data.returnDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ),
      ratePerDay: new FormControl(this.data.ratePerDay, [Validators.required]),
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
      returned: new FormControl({ value: this.data.returned, disabled: true }, [
        Validators.required,
      ]),
      daysQuantity: new FormControl(this.data.daysQuantity, [
        Validators.required,
      ]),
    });
    this.setup();
    this.onDateChange();
  }

  setup(): void {}

  validateVehicleInspection(
    vehicleId: number,
    clientId: number,
    inspectionDate: string
  ): Promise<any> {
    return lastValueFrom(
      this.inspectionService.isVehicleInspected(
        vehicleId,
        clientId,
        inspectionDate
      )
    );
  }

  validateVehicleAvailability(
    vehicleId: number,
    rentDate: string,
    returnDate: string
  ): Promise<any> {
    return lastValueFrom(
      this.service.isAvailableForRent(vehicleId, rentDate, returnDate)
    );
  }

  onDateChange() {
    let rentDateValue = this.dataForm.get('rentDate')?.value;
    let returnDateValue = this.dataForm.get('returnDate')?.value;

    if (!rentDateValue || !returnDateValue) return;

    let rentDate = new Date(rentDateValue);
    let returnDate = new Date(returnDateValue);

    // validar fechas

    if (returnDate.toISOString() < rentDate.toISOString()) {
      // show toaster
      this.isDateValid = false;
      this.sharedService.showWarning('Rango de fechas invalidos.');
      return;
    }

    let diff = returnDate.getTime() - rentDate.getTime();
    let daysDiff = +(diff / 1000 / 60 / 60 / 24).toFixed(0);

    if (daysDiff == 0) daysDiff = 1;

    this.dataForm.get('daysQuantity')?.setValue(daysDiff);
    this.isDateValid = true;
  }

  async onConfirm() {
    const {
      vehicleId,
      clientId,
      employeeId,
      rentDate,
      returnDate,
      ratePerDay,
      returned,
      daysQuantity,
      status,
    } = this.dataForm.getRawValue();

    const data = {
      id: 0,
      vehicleId,
      clientId,
      employeeId,
      rentDate,
      returnDate,
      ratePerDay,
      returned: returned == 'true',
      daysQuantity,
      status: status === 'true',
    };

    // verificar la inspeccion del vehiculo
    const isVehicleInspected = await this.validateVehicleInspection(
      vehicleId,
      clientId,
      rentDate
    );

    if (!isVehicleInspected.data) {
      this.sharedService.showWarning('El vehiculo necesita inspección.');
      return;
    }

    // verificar que este disponible el vehiculo en el rango de fecha
    const isAvailableForRent = await this.validateVehicleAvailability(
      vehicleId,
      rentDate,
      returnDate
    );

    if (!isAvailableForRent.data) {
      this.sharedService.showWarning(
        'El vehiculo no esta disponible en este rango de fecha.'
      );
      return;
    }

    if (this.data.id) {
      data.id = this.data.id;
      this.service.edit(data).subscribe((res) => {
        // Close the dialog, return true
        if (res.success) {
          this.dialogRef.close(true);
        }
      });
    } else {
      this.service.add(data).subscribe((res) => {
        // Close the dialog, return true
        if (res.success) {
          this.dialogRef.close(true);
        }
      });
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  fillDropdown(): void {
    this.vehicleService.list().subscribe((value) => {
      if (value.success) {
        this.ddlVehicleValues = value.data;
      }
    });
    this.clientService.list().subscribe((value) => {
      if (value.success) {
        this.ddlClientValues = value.data;
      }
    });
    this.employeeService.list().subscribe((value) => {
      if (value.success) {
        this.ddlEmployeeValues = value.data;
      }
    });
  }
}

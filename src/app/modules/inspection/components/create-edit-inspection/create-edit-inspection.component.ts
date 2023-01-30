import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { InspectionService } from '../../services/inspection.service';
import { VehicleService } from 'src/app/modules/maintenance/pages/vehicle/services/vehicle.service';
import { ClientService } from 'src/app/modules/maintenance/pages/client/services/client.service';
import { EmployeeService } from 'src/app/modules/maintenance/pages/employee/services/employee.service';

@Component({
  selector: 'app-create-edit-inspection',
  templateUrl: './create-edit-inspection.component.html',
  styleUrls: ['./create-edit-inspection.component.scss'],
})
export class CreateEditInspectionComponent implements OnInit {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  ddlVehicleValues: any[] = [];
  ddlClientValues: any[] = [];
  ddlEmployeeValues: any[] = [];
  constructor(
    private service: InspectionService,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<CreateEditInspectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fillDropdown();
    if (this.data.id) {
      this.action = 'Editar';
    }
    this.dataForm = this.fb.group({
      vehicleId: new FormControl(this.data.vehicleId, [Validators.required]),
      clientId: new FormControl(this.data.clientId, [Validators.required]),
      hasScratches: new FormControl(this.data.hasScratches, [
        Validators.required,
      ]),
      fuelQuantity: new FormControl(this.data.fuelQuantity, [
        Validators.required,
      ]),
      hasSpareTire: new FormControl(this.data.hasSpareTire, [
        Validators.required,
      ]),
      hasManualJack: new FormControl(this.data.hasManualJack, [
        Validators.required,
      ]),
      hasGlassBreakage: new FormControl(this.data.hasGlassBreakage, [
        Validators.required,
      ]),
      firstTireCondition: new FormControl(this.data.firstTireCondition, [
        Validators.required,
      ]),
      secondTireCondition: new FormControl(this.data.secondTireCondition, [
        Validators.required,
      ]),
      thirdTireCondition: new FormControl(this.data.thirdTireCondition, [
        Validators.required,
      ]),
      fourthTireCondition: new FormControl(this.data.fourthTireCondition, [
        Validators.required,
      ]),
      employeeId: new FormControl(this.data.employeeId, [Validators.required]),
      inspectionDate: new FormControl(
        formatDate(this.data.inspectionDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ),
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
    });
  }
  onConfirm(): void {
    const {
      vehicleId,
      clientId,
      employeeId,
      fuelQuantity,
      hasSpareTire,
      hasScratches,
      hasManualJack,
      hasGlassBreakage,
      firstTireCondition,
      secondTireCondition,
      thirdTireCondition,
      fourthTireCondition,
      inspectionDate,
      status,
    } = this.dataForm.value;
    const data = {
      id: 0,
      vehicleId,
      clientId,
      employeeId,
      fuelQuantity,
      hasSpareTire,
      hasScratches,
      hasManualJack,
      hasGlassBreakage,
      firstTireCondition,
      secondTireCondition,
      thirdTireCondition,
      fourthTireCondition,
      inspectionDate,
      status: status === 'true',
    };

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

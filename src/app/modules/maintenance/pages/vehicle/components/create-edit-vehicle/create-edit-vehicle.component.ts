import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
@Component({
  selector: 'app-create-edit-vehicle',
  templateUrl: './create-edit-vehicle.component.html',
  styleUrls: ['./create-edit-vehicle.component.scss'],
})
export class CreateEditVehicleComponent implements OnInit {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  constructor(
    private service: VehicleService,
    public dialogRef: MatDialogRef<CreateEditVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.action = 'Editar';
    }
    this.dataForm = this.fb.group({
      description: new FormControl(this.data.description, [
        Validators.required,
      ]),
      chassisNumber: new FormControl(this.data.chassisNumber, [
        Validators.required,
      ]),
      engineNumber: new FormControl(this.data.engineNumber, [
        Validators.required,
      ]),
      plateNumber: new FormControl(this.data.plateNumber, [
        Validators.required,
      ]),
      vehicleTypeId: new FormControl(this.data.vehicleTypeId, [
        Validators.required,
      ]),
      brandId: new FormControl(this.data.brandId, [Validators.required]),
      modelId: new FormControl(this.data.modelId, [Validators.required]),
      fuelTypeId: new FormControl(this.data.fuelTypeId, [Validators.required]),
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
    });
  }
  onConfirm(): void {
    const {
      description,
      chassisNumber,
      engineNumber,
      plateNumber,
      vehicleTypeId,
      brandId,
      modelId,
      fuelTypeId,
      status,
    } = this.dataForm.value;
    const data = {
      id: 0,
      description,
      chassisNumber,
      engineNumber,
      plateNumber,
      vehicleTypeId,
      brandId,
      modelId,
      fuelTypeId,
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
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { formatDate } from '@angular/common';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-create-edit-employee',
  templateUrl: './create-edit-employee.component.html',
  styleUrls: ['./create-edit-employee.component.scss'],
})
export class CreateEditEmployeeComponent implements OnInit {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  constructor(
    private service: EmployeeService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<CreateEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.action = 'Editar';
    }
    this.dataForm = this.fb.group({
      name: new FormControl(this.data.name, [Validators.required]),
      idCard: new FormControl(this.data.idCard, [Validators.required]),
      workShift: new FormControl(this.data.workShift, [Validators.required]),
      comissionPercentage: new FormControl(this.data.comissionPercentage, [
        Validators.required,
      ]),
      hireDate: new FormControl(
        formatDate(this.data.hireDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ),
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
    });
  }
  onConfirm(): void {
    const { name, idCard, workShift, comissionPercentage, hireDate, status } =
      this.dataForm.value;
    const data = {
      id: 0,
      name,
      idCard,
      workShift,
      comissionPercentage,
      hireDate,
      status: status === 'true',
    };

    if (!this.sharedService.isValidIdNumber(idCard)) {
      this.sharedService.showError('La cedula ingresada es invalida');
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
}

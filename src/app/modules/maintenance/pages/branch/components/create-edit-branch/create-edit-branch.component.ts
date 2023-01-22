import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-create-edit-branch',
  templateUrl: './create-edit-branch.component.html',
  styleUrls: ['./create-edit-branch.component.scss'],
})
export class CreateEditBranchComponent implements OnInit {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  constructor(
    private service: BranchService,
    public dialogRef: MatDialogRef<CreateEditBranchComponent>,
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
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
    });
  }

  onConfirm(): void {
    const { description, status } = this.dataForm.value;
    const data = {
      id: 0,
      description,
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

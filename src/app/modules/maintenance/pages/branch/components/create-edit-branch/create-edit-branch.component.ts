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
  action: string = '';
  dataForm!: FormGroup;
  constructor(
    private service: BranchService,
    public dialogRef: MatDialogRef<CreateEditBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // traer registro por id
    if (this.data && this.data.id) {
      // buscar registro en la db
    }
    this.dataForm = this.fb.group({
      description: new FormControl('', [Validators.required]),
      status: new FormControl('true', [Validators.required]),
    });
  }

  onConfirm(): void {
    const { description, status } = this.dataForm.value;
    const data = {
      description,
      status: status === 'true',
    };

    this.service.add(data).subscribe((res) => {
      // Close the dialog, return true
      if (res.success) {
        this.dialogRef.close(true);
      }
    });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

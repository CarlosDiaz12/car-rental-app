import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-create-edit-client',
  templateUrl: './create-edit-client.component.html',
  styleUrls: ['./create-edit-client.component.scss'],
})
export class CreateEditClientComponent {
  action: string = 'Agregar';
  dataForm!: FormGroup;
  constructor(
    private service: ClientService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<CreateEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.action = 'Editar';
    }
    this.dataForm = this.fb.group({
      name: new FormControl(this.data.name, [Validators.required]),
      identificationCard: new FormControl(this.data.identificationCard, [
        Validators.required,
      ]),
      creditCardNumber: new FormControl(this.data.creditCardNumber, [
        Validators.required,
      ]),
      creditLimit: new FormControl(this.data.creditLimit, [
        Validators.required,
      ]),
      taxPayerType: new FormControl(this.data.taxPayerType, [
        Validators.required,
      ]),
      status: new FormControl(this.data.status.toString(), [
        Validators.required,
      ]),
    });
  }

  onConfirm(): void {
    const {
      name,
      identificationCard,
      creditCardNumber,
      creditLimit,
      taxPayerType,
      status,
    } = this.dataForm.value;
    const data = {
      id: 0,
      name,
      identificationCard,
      creditCardNumber,
      creditLimit,
      taxPayerType,
      status: status === 'true',
    };

    if (!this.sharedService.isValidIdNumber(identificationCard)) {
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

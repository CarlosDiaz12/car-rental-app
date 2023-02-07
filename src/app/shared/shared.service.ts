import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private toastr: ToastrService) {}
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showWarning(message: string) {
    this.toastr.warning(message);
  }

  // validate id number
  isValidIdNumber(str: string): boolean {
    var regex = new RegExp('^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$');
    if (!regex.test(str)) {
      return false;
    }
    str = str.replaceAll(new RegExp(/'-'/g), '');
    if (str.split('').every((element) => element == '0')) return false;
    return this.checkDigit(str);
  }

  private checkDigit(str: string): boolean {
    var sum = 0;
    for (var i = 0; i < 10; ++i) {
      var n = ((i + 1) % 2 != 0 ? 1 : 2) * parseInt(str[i]);
      sum += n <= 9 ? n : (n % 10) + 1;
    }
    var dig = (10 - (sum % 10)) % 10;

    return dig == parseInt(str[10]);
  }

  idNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (!control) return null;
    const value = control.value;

    if (!value) {
      return null;
    }
    const validIdNumber = this.isValidIdNumber(value);
    return !validIdNumber ? { invalidIdNumber: true } : null;
  }
}

import { Injectable } from '@angular/core';
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
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  dataForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onConfirm() {
    this.isLoading = true;
    const { userName, password } = this.dataForm.value;

    this.authService.login(userName, password).subscribe(
      (res) => {
        this.sharedService.showSuccess('Inicio se sesion satisfactorio');
        // set user info
        this.authService.setUserInfo(res.data);
        this.router.navigate(['/'], { replaceUrl: true });
      },
      (error) => {
        console.log(error);
        this.sharedService.showError(error.error.errorMessage);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}

import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'car-rental-app';
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  logout() {
    this.authService.clearUserInfo();
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}

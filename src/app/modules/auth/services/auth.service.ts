import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import { DataService } from '../../../shared/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly USER_INFO_KEY: string = '_userInfo';
  public isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient, private dataService: DataService) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/login', {
      userName,
      password,
    });
  }

  setUserInfo(data: any) {
    this.dataService.setLocalStoreageItem(this.USER_INFO_KEY, data);
    this.isUserLoggedIn = true;
  }

  getUserInfo(): any {
    const userInfo = this.dataService.getLocalStorageItem(this.USER_INFO_KEY);
    if (userInfo == null) return null;

    return JSON.parse(userInfo);
  }

  clearUserInfo() {
    this.isUserLoggedIn = false;
    this.dataService.removeLocalStorageItem(this.USER_INFO_KEY);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'employee');
  }
}

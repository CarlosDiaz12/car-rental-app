import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'client');
  }
}

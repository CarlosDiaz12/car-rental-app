import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../enviroments/enviroment';
import { BaseService } from '../../../../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'brand');
  }
}

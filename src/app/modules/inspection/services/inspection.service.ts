import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InspectionService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'inspection');
  }

  isVehicleInspected(
    vehicleId: number,
    clientId: number,
    inspectionDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('vehicleId', vehicleId)
      .set('clientId', clientId)
      .set('inspectionDate', formatDate(inspectionDate, 'yyyy-MM-dd', 'en'));
    return this.http.get(environment.apiUrl + `/${this.endpoint}/inspected`, {
      params,
    });
  }
}

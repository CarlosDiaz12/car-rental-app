import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class RentService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'rent');
  }

  isAvailableForRent(
    vehicleId: number,
    rentDate: string,
    returnDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('vehicleId', vehicleId)
      .set('rentDate', formatDate(rentDate, 'yyyy-MM-dd', 'en'))
      .set('returnDate', formatDate(returnDate, 'yyyy-MM-dd', 'en'));
    return this.http.get(environment.apiUrl + `/${this.endpoint}/available`, {
      params,
    });
  }
  completeRent(rentId: number): Observable<any> {
    return this.http.put(
      environment.apiUrl + `/${this.endpoint}/${rentId}/complete`,
      {}
    );
  }
}

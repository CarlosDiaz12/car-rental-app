import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { IBaseService } from '../interfaces/ibase.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> implements IBaseService<T> {
  endpoint: string = '';
  constructor(public http: HttpClient, endpoint: string) {
    this.endpoint = endpoint;
  }

  add(dto: any): Observable<any> {
    return this.http.post(environment.apiUrl + `/${this.endpoint}`, dto);
  }

  edit(dto: any): Observable<any> {
    return this.http.put(environment.apiUrl + `/${this.endpoint}`, dto);
  }

  list(): Observable<any> {
    return this.http.get(environment.apiUrl + `/${this.endpoint}`);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.delete(environment.apiUrl + `/${this.endpoint}`, {
      params,
    });
  }

  getById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/${this.endpoint}/${id}`);
  }
}

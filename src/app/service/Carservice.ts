import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseservice } from './baseservice';
import { car } from '../models/car';
import { services } from '../models/services';
@Injectable({
  providedIn: 'root',
})
export class Carservice extends baseservice<car>   {
  constructor(public http: HttpClient) {
    super(http,"car");
  }

  Loadcars(employee: any): Observable<object> {
    return this.http
      .post<object>(
        this.apiURL + '/loadcars',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}

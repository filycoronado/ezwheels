import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseservice } from './baseservice';
import { car } from '../models/car';
import { services } from '../models/services';
import { customer } from '../models/customer';
@Injectable({
  providedIn: 'root',
})
export class Customerservice extends baseservice<customer>   {
  constructor(public http: HttpClient) {
    super(http, "customer");
  }

  // HttpClient API get() method => Fetch employees list
  getSales(dates: any): Observable<object> {
    return this.http
      .get<object>(this.apiURL + '/getsells/?start=' + dates.start_date + "&end=" + dates.end_date)
      .pipe(retry(1), catchError(this.handleError));
  }
}

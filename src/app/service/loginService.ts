
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { __extends } from 'tslib';
@Injectable({
  providedIn: 'root',
})
export class loginservice<T>  {
  // Define API
  public apiURL = 'http://localhost/rest-api/web/v1/';
  public object: T;
  constructor(public http: HttpClient) {
    this.apiURL = this.apiURL + "login";
  }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };


  login(employee: object): Observable<object> {
    return this.http
      .post<object>(
        this.apiURL + '/login',
        JSON.stringify(employee),
        this.httpOptions
      ).pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}

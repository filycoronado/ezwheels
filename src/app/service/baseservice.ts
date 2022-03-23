
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { __extends } from 'tslib';

export class baseservice<T>  {
  // Define API
  public apiURL = 'http://localhost/rest-api/web/v1/';
  public  object: T;

  constructor(public http: HttpClient,controllerName:string) {
    debugger
    this.apiURL = this.apiURL + controllerName.toString();
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
  // HttpClient API get() method => Fetch employees list
  getAll(): Observable<object> {
    return this.http
      .get<object>(this.apiURL + '/getall')
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch employee
  getById(id: number): Observable<object> {
    return this.http
      .get<object>(this.apiURL + '/getbyid/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create employee
  create(employee: object): Observable<object> {
    return this.http
      .post<object>(
        this.apiURL + '/create',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update employee
  update(id: number, employee: object): Observable<object> {
    return this.http
      .put<any>(
        this.apiURL + '/update/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete employee
  delete(id: number) {
    return this.http
      .delete<object>(this.apiURL + '/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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

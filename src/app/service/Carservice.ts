import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseservice } from './baseservice';
import { car } from '../models/car';
@Injectable({
  providedIn: 'root',
})
export class Carservice extends baseservice<car>   {
  constructor(public http: HttpClient) {
    super(http,"car");
  }




}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseservice } from './baseservice';
import { Carservices } from '../models/carservices';
@Injectable({
  providedIn: 'root',
})
export class CarServicesservice extends baseservice<Carservices>   {
  constructor(public http: HttpClient) {
    super(http,"carservices");
  }
}

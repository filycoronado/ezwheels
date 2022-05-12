import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseservice } from './baseservice';
import { services } from '../models/services';

@Injectable({
  providedIn: 'root',
})


export class servicesservice extends baseservice<services>   {
  constructor(public http: HttpClient) {
    super(http, "service");
  }
}

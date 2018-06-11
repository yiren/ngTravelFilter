import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TravelInfoService {
  constructor(private httpClient: HttpClient) { }

}

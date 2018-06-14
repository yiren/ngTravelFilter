import { catchError, map } from 'rxjs/operators';

import { API_URL } from '../config';
import { Attraction } from '../model/attraction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TravelInfoService {
  constructor(private httpClient: HttpClient) { }


  getAttactions() : Observable<Attraction[]>{
    return this.httpClient.get(API_URL)
              .pipe(
                map((data:any) => data.result.records)
              );
  }

}

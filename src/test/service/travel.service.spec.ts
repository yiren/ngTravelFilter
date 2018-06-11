import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, fakeAsync } from "@angular/core/testing";

import { API_URL } from '../../app/shared/config';
import { Attraction } from './../../app/shared/model/attraction.model';
import { fakeData } from './fake.data';
import { map } from 'rxjs/operators';

describe('測試TravelInfo服務', () => {

  let httpClient: HttpClient;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestController = TestBed.get(HttpTestingController);

  });

  it('測試Get API資料', async(() => {
    const testData = fakeData.result.records;
    httpClient.get(API_URL)
              .pipe(
                map((data:any) => data.result.records)
              )
              .subscribe((data:Attraction[]) => {
                console.log(data)
                expect(data).toEqual(testData);
              });
    const req = httpTestController.expectOne(API_URL);
    
    expect(req.request.method).toEqual('GET');
    
    req.flush(fakeData);

    httpTestController.verify();
  }));

  it('', () => {

  });
  

  
});

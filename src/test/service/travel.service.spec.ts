import * as _ from 'lodash';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, fakeAsync } from "@angular/core/testing";

import { API_URL } from '../../app/shared/config';
import { Attraction } from './../../app/shared/model/attraction.model';
import { map } from 'rxjs/operators';
import { remoteTestData } from './test.data';

describe('測試TravelInfo服務', () => {

  let httpClient: HttpClient;
  //let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });

    httpClient = TestBed.get(HttpClient);
    //httpTestController = TestBed.get(HttpTestingController);

  });

  it('測試Get API資料', async(() => {
    const testData = remoteTestData.result.records;

    httpClient.get(API_URL)
              .pipe(
                map((data:any) => data.result.records)
              )
              .subscribe((data:Attraction[]) => {
                //console.log(data.filter((d)=>d.Ticketinfo))
                expect(data).toEqual(testData);
              });
    // const req = httpTestController.expectOne(API_URL);

    // expect(req.request.method).toEqual('GET');

    // req.flush(fakeData);

    // httpTestController.verify();
  }));

  it('測試把地區變成array', () => {
    const testData = remoteTestData.result.records;
    let remoteData: Attraction[];

    httpClient.get(API_URL)
              .pipe(
                map((data: any) => data.result.records)
              )
              .subscribe((data: Attraction[]) => {
                remoteData = data;
              });

    const allZone = testData.map(record => record.Zone);
    //console.log('allZone', allZone);
    const uniqZones= _.uniq(allZone);
    //console.log(uniqZones);
    const allCategoryId = testData.map(record => record.Class1);
    let idgen = 0;
    const zoneCollection=uniqZones.map(zone=>{
      idgen+=1;
      return {
        id:idgen,
        text:zone
      }
    });

    //console.log(zoneCollection);

    //console.log(testData.map(e=>e.Opentime));
  });

  it('',()=>{

  })
});

import * as fromApp from "../../app/store";
import * as fromTravelActions from './../../app/store/actions/travel-info.actions';
import * as fromTravelReducer from './../../app/store/reducers/travel-info.reducer';

import { Store, StoreModule } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';
import { mapAttractionsToEntities } from './../../app/store/reducers/travel-info.reducer';
import { remoteTestData } from '../service/test.data';

describe('測試travel selectors', ()=>{
  let store:Store<fromApp.AppState>
  let seedEntities;
  const testData = remoteTestData.result.records;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({
          ...fromApp.reducers,
          travelInfo: fromTravelReducer.travelReducer
        })
      ]
    });
    store=TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();


    seedEntities = mapAttractionsToEntities(testData);
  })

  describe('測試entities selector', ()=>{
    it('應回傳Attraction Entities', ()=>{
      let result;
      //console.log(store);
      store
        .select(fromTravelReducer.selectAttractionsEntities)
        .subscribe(data=>{
          result=data;
        })

      expect(result).toEqual(null);

      store.dispatch(new fromTravelActions.LoadAttractionsSuccessAction(remoteTestData.result.records));
      
      expect(result).toEqual(seedEntities);

    })
  });
  describe('測試景點 selector', ()=>{
    it('應回傳景點array', ()=>{
      let result;
      //console.log(store);
      store
        .select(fromTravelReducer.selectAllAttractions)
        .subscribe(data=>{
          //console.log(data);
          result=data;
        })

      expect(result).toEqual([]);

      store.dispatch(new fromTravelActions.LoadAttractionsSuccessAction(remoteTestData.result.records));
      

      expect(result).toEqual(testData);

    })
  });
})

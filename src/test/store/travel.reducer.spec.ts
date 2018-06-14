import * as _ from 'lodash';
import * as fromActions from './../../app/store/actions/travel-info.actions';

import {
  TravelInfoState,
  filterEntitiesByParams,
  initialState,
  mapAttractionsToEntities,
  mapLocationsToCollection,
  travelReducer
} from '../../app/store/reducers/travel-info.reducer';

import { Attraction } from '../../app/shared/model/attraction.model';
import { remoteTestData } from './../service/test.data';

describe('測試Travel Reducer', ()=>{

  let seedEntities;
  const testData = remoteTestData.result.records;
  beforeEach(()=>{
    
    seedEntities = mapAttractionsToEntities(testData);
    //console.log(seedEntities);
  });


  describe('測試load reducer', () => {
    it('Request資料Action', ()=>{

      const action = new fromActions.LoadAttractionsAction();

      const state= travelReducer(initialState, action);

      const expected: TravelInfoState = {
        ...initialState,
        isLoaded:false,
        isLoading:true
      };

      expect(state).toEqual(expected);

    });


    it('載入資料到Store', ()=>{
      const remoteData=remoteTestData.result.records;
      const action = new fromActions.LoadAttractionsSuccessAction(remoteData);

      const previousState={
        ...initialState,
        isLoaded:false,
        isLoading:true
      };

      const state = travelReducer(previousState, action);

      const expected: TravelInfoState = {
        ...previousState,
        entities:seedEntities,
        isLoaded:true,
        isLoading:false
      };
      expect(state).toEqual(expected);

    });

    it('產生location state給Dropdown', ()=>{
      
      const action = new fromActions.GenerateLocationsStateAction();
      const previousState={
        ...initialState,
        entities:seedEntities,
        isLoaded:false,
        isLoading:true
      };


      const state = travelReducer(previousState, action);


      const locations=mapLocationsToCollection(testData);

      const expected: TravelInfoState = {
        ...previousState,
        locationsForUI:locations
      };
      expect(state).toEqual(expected);
    });
  });

  describe('篩選reducer', ()=>{
    it('set 關鍵字 state', ()=>{
      const keyword='愛河';

      const action = new fromActions.SearchByKeywordAction(keyword);

      const previousState:TravelInfoState={
        ...initialState
      };

      const state = travelReducer(previousState, action);
      const expected: TravelInfoState = {
        ...previousState,
        keyword
      };

      expect(state).toEqual(expected);
    });


    it('set 地區 state', ()=>{
      const locationId = 5;
      const action = new fromActions.SearchByLocationAction(locationId);
      const previousState:TravelInfoState={
        ...initialState,
      };

      const state = travelReducer(previousState, action);


      const expected: TravelInfoState = {
        ...previousState,
        locationId
      };

      expect(state).toEqual(expected);
    });

    it('set 是否免費 state', ()=>{
      const isFree=true;

      const action = new fromActions.SearchByIsFreeAction(isFree);

      const previousState:TravelInfoState={
        ...initialState,
      };

      const state = travelReducer(previousState, action);

      const expected: TravelInfoState = {
        ...previousState,
        isFree
      };

      expect(state).toEqual(expected);
    });

    it('set 是否全天 state', ()=>{
      const isAllDay = true;

      const action = new fromActions.SearchByIsAllDayAction(isAllDay);

      const previousState:TravelInfoState={
        ...initialState
      };

      const state = travelReducer(previousState, action);

      const expected: TravelInfoState = {
        ...previousState,
        isAllDay
      };

      expect(state).toEqual(expected);
    });

    it('執行搜尋(無搜尋條件)', ()=>{
      const action = new fromActions.FilterAttractionsAction();
      const locationsForUI = mapLocationsToCollection(remoteTestData.result.records);
      const previousState:TravelInfoState={
        ...initialState,
        entities:seedEntities,
        locationsForUI,
        isAllDay:initialState.isAllDay,
        isFree:initialState.isFree,
        locationId:initialState.locationId,
        keyword:initialState.keyword
      };

      const state = travelReducer(previousState, action);


      const entities:{[id:number]:Attraction} = _.cloneDeep(seedEntities);

      
      const {keyword} = previousState;
      const {locationId} = previousState;
      const {isFree} = previousState;
      const {isAllDay} = previousState;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI,locationId, isFree,isAllDay,keyword);

      const expected: TravelInfoState = {
        ...previousState,
        entities:filteredEntities
      };

      expect(state).toEqual(expected);
    });

    it('執行搜尋(關鍵字)', ()=>{
      
      const keyword='館'
      const action = new fromActions.FilterAttractionsAction();
      const locationsForUI = mapLocationsToCollection(remoteTestData.result.records);
      const previousState:TravelInfoState={
        ...initialState,
        entities:seedEntities,
        locationsForUI,
        isAllDay:initialState.isAllDay,
        isFree:initialState.isFree,
        locationId:initialState.locationId,
        keyword
      };

      const state = travelReducer(previousState, action);

      const entities=_.cloneDeep(previousState.entities);
      const {locationId} = previousState;
      const {isFree} = previousState;
      const {isAllDay} = previousState;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI,locationId, isFree,isAllDay,keyword);

      const expected: TravelInfoState = {
        ...previousState,
        entities:filteredEntities
      };

      expect(state).toEqual(expected);
    });

    it('執行搜尋(地區)', ()=>{
      
      const locationId = 3;
      const action = new fromActions.FilterAttractionsAction();
      const locationsForUI = mapLocationsToCollection(remoteTestData.result.records);
      const previousState:TravelInfoState = {
        ...initialState,
        entities:seedEntities,
        locationsForUI,
        isAllDay:initialState.isAllDay,
        isFree:initialState.isFree,
        locationId,
        keyword:initialState.keyword
      };

      const state = travelReducer(previousState, action);

      const entities:{[id:number]:Attraction} = _.cloneDeep(seedEntities);

      const {keyword} = previousState;
      const {isFree} = previousState;
      const {isAllDay} = previousState;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI,locationId, isFree,isAllDay,keyword);
      const expected: TravelInfoState = {
        ...previousState,
        entities:filteredEntities
      };

      expect(state).toEqual(expected);
    });

    it('執行搜尋(是否免費)', ()=>{
      
      const isFree = false;
      const action = new fromActions.FilterAttractionsAction();
      const locationsForUI = mapLocationsToCollection(remoteTestData.result.records);
      const previousState:TravelInfoState = {
        ...initialState,
        entities:seedEntities,
        locationsForUI,
        isAllDay:initialState.isAllDay,
        isFree,
        locationId:initialState.locationId,
        keyword:initialState.keyword
      };

      const state = travelReducer(previousState, action);

      const entities:{[id:number]:Attraction} = _.cloneDeep(seedEntities);

      const {keyword} = previousState;
      const {locationId} =previousState;
      const {isAllDay} = previousState;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI,locationId, isFree,isAllDay,keyword);
      const expected: TravelInfoState = {
        ...previousState,
        entities:filteredEntities
      };
      
      expect(state).toEqual(expected);
    });

    it('執行搜尋(是否全天)', ()=>{
      
      const isAllDay = false;
      const action = new fromActions.FilterAttractionsAction();
      const locationsForUI = mapLocationsToCollection(remoteTestData.result.records);
      const previousState:TravelInfoState = {
        ...initialState,
        entities:seedEntities,
        locationsForUI,
        isAllDay,
        isFree:initialState.isFree,
        locationId:initialState.locationId,
        keyword:initialState.keyword
      };

      const state = travelReducer(previousState, action);

      const entities:{[id:number]:Attraction} = _.cloneDeep(seedEntities);

      const {keyword} = previousState;
      const {locationId} =previousState;
      const {isFree} = previousState;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI,locationId, isFree,isAllDay,keyword);
      const expected: TravelInfoState = {
        ...previousState,
        entities:filteredEntities
      };

      expect(state).toEqual(expected);
    });
  });


});

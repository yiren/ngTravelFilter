import { Action } from '@ngrx/store';
import { Attraction } from './../../shared/model/attraction.model';

export enum TravelInfoActionTypes {
  LoadAttractionsAction = '[TravelInfo] Load Attractions Action',
  LoadAttractionsSuccessAction = '[TravelInfo] Load Attractions Success Action',
  GenerateLocationsStateAction = '[TravelInfo] Generate Locations State Action',
  SearchByKeywordAction='[TravelInfo] Search By Keyword Action',
  SearchByLocationAction= '[TravelInfo] Search By Location Action',
  SearchByIsFreeAction = '[TravelInfo] Search By IsFree Action',
  SearchByIsAllDayAction = '[TravelInfo] Search By IsAllDay Action',
  SearchByCategoryAction ='[TravelInfo] Search By Category Action',
  PerformSearchAction = '[TravelInfo] Perform Search Action'
}

export class LoadAttractionsAction implements Action {
  readonly type = TravelInfoActionTypes.LoadAttractionsAction;
}

export class LoadAttractionsSuccessAction implements Action {
  readonly type = TravelInfoActionTypes.LoadAttractionsSuccessAction;
  constructor(public payload:Attraction[]){}
}

export class GenerateLocationsStateAction implements Action {
  readonly type = TravelInfoActionTypes.GenerateLocationsStateAction;
  constructor(public payload:Attraction[]){}
}

export class SearchByKeywordAction implements Action {
  readonly type = TravelInfoActionTypes.SearchByKeywordAction;
  constructor(public payload:string){}
}

export class SearchByLocationAction implements Action {
  readonly type = TravelInfoActionTypes.SearchByLocationAction;
  constructor(public payload:number){}
}

export class SearchByIsFreeAction implements Action {
  readonly type = TravelInfoActionTypes.SearchByIsFreeAction;
  constructor(public payload:boolean){}
}

export class SearchByIsAllDayAction implements Action {
  readonly type = TravelInfoActionTypes.SearchByIsAllDayAction;
  constructor(public payload:boolean){}
}

export class SearchByCategoryAction implements Action {
  readonly type = TravelInfoActionTypes.SearchByCategoryAction;
  constructor(public payload:number){}
}

export class PerformSearchAction implements Action {
  readonly type = TravelInfoActionTypes.PerformSearchAction;
}





export type TravelInfoActions = LoadAttractionsAction |
LoadAttractionsSuccessAction |
GenerateLocationsStateAction |
SearchByCategoryAction |
SearchByIsAllDayAction |
SearchByIsFreeAction |
SearchByLocationAction|
SearchByKeywordAction |
PerformSearchAction
;

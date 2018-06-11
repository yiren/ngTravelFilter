import { Action } from '@ngrx/store';
import { Attraction } from './../../shared/model/attraction.model';

export enum TravelInfoActionTypes {
  LoadAttractionsAction = '[TravelInfo] Load Attractions Action',
  LoadAttractionsSuccessAction = '[TravelInfo] Load Attractions Success Action',
}

export class LoadAttractionsAction implements Action {
  readonly type = TravelInfoActionTypes.LoadAttractionsAction;
}

export class LoadAttractionsSuccessAction implements Action {
  readonly type = TravelInfoActionTypes.LoadAttractionsSuccessAction;
  constructor(public payload:Attraction[]){}
}

export type TravelInfoActions = LoadAttractionsAction |
LoadAttractionsSuccessAction;

import * as fromActions from '../actions/travel-info.actions';
import * as moment from 'moment';

import { Action } from '@ngrx/store';
import { Attraction } from '../../shared/model/attraction.model';

export interface TravelInfoState {
  attractionEntities:{[id:string]:Attraction[]};
  isLoading:boolean;
  isLoaded:boolean;
  keyword:string;
  from:Date;
  to:Date;
  zone:string;
  categoryId:number;
}
export const initialState: TravelInfoState = {
  attractionEntities:null,
  isLoaded:false,
  isLoading:false,
  keyword:null,
  from:null,
  to:null,
  zone:null,
  categoryId:undefined
};

export function travelReducer(state = initialState, action: fromActions.TravelInfoActions): TravelInfoState {
  switch (action.type) {

    default:
      return state;
  }
}

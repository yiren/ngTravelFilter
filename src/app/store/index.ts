import * as fromTravelInfo from './reducers/travel-info.reducer';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { environment } from '../../environments/environment';

export interface AppState{
  travelInfo:fromTravelInfo.TravelInfoState;
}

export const reducers: ActionReducerMap<AppState> = {
  travelInfo:fromTravelInfo.travelReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

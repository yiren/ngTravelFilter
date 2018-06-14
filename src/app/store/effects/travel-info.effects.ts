import * as fromActions from '../actions/travel-info.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { Attraction } from '../../shared/model/attraction.model';
import { Injectable } from '@angular/core';
import { TravelInfoService } from '../../shared/services/travel.service';

@Injectable()
export class TravelInfoEffects {

  @Effect()
  loadAttractions$ = this.actions$.pipe(
    ofType(fromActions.TravelInfoActionTypes.LoadAttractionsAction),
    switchMap(()=>this.travelService.getAttactions()),
    map((attractions:Attraction[])=>new fromActions.LoadAttractionsSuccessAction(attractions))
  )

  @Effect()
  loadLocations$=this.actions$.pipe(
    ofType(fromActions.TravelInfoActionTypes.LoadAttractionsSuccessAction),
    map(()=>new fromActions.GenerateLocationsStateAction())
  )

  @Effect()
  filterAttractions$=this.actions$.pipe(
    ofType(fromActions.TravelInfoActionTypes.LoadAttractionsSuccessAction),
    map(()=>new fromActions.FilterAttractionsAction())
  )

  @Effect()
  searchParams$ = this.actions$.pipe(
    ofType(
      fromActions.TravelInfoActionTypes.SearchByIsAllDayAction,
      fromActions.TravelInfoActionTypes.SearchByKeywordAction,
      fromActions.TravelInfoActionTypes.SearchByIsFreeAction,
      fromActions.TravelInfoActionTypes.SearchByLocationAction
    ),
    map(()=>new fromActions.LoadAttractionsAction())
  )

  constructor(
    private actions$: Actions,
    private travelService:TravelInfoService
  ){}
}

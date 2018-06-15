import * as fromTravelActions from './store/actions/travel-info.actions';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { selectAllAttractions, selectLocationsForUI } from './store/reducers/travel-info.reducer';

import { AppState } from './store/index';
import { Attraction } from './shared/model/attraction.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  form:FormGroup;
  attractions$:Observable<Attraction[]>;
  locations$:Observable<{id:number, text:string}[]>;
  searchResultCount:number;
  ngOnInit(){
    this.store.dispatch(new fromTravelActions.LoadAttractionsAction());
    this.attractions$ = this.store.select(selectAllAttractions)
                            .pipe(
                              tap(attractions=>this.searchResultCount=attractions.length)
                            );
    this.locations$ = this.store.select(selectLocationsForUI);
    this.form = this.fb.group({
      'keyword': '',
      'isAllDay': 0,
      'isFree': 0,
      'locationId': 0
    });

    this.form.controls['isFree'].valueChanges.subscribe(
      isFree => //console.log(isFree)
      this.store.dispatch(new fromTravelActions.SearchByIsFreeAction(isFree))
    );

    this.form.controls['locationId'].valueChanges.subscribe(
      locationId => //console.log(locationId)
      this.store.dispatch(new fromTravelActions.SearchByLocationAction(locationId))
    );

    this.form.controls['isAllDay'].valueChanges.subscribe(
      isAllDay => //console.log(isAllDay)
      this.store.dispatch(new fromTravelActions.SearchByIsAllDayAction(isAllDay))
    );

    this.form.controls['keyword'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(keyword => //console.log(keyword)
      this.store.dispatch(new fromTravelActions.SearchByKeywordAction(keyword))
    );
  }
  constructor(
    private fb:FormBuilder,
    private store:Store<AppState>
  ){}

  setLocation(locationId:number) {
    this.store.dispatch(new fromTravelActions.SearchByLocationAction(locationId));
  }

  getCount(){
    return this.searchResultCount;
  }
  setIsFree(isFree) {
    this.store.dispatch(new fromTravelActions.SearchByIsFreeAction(isFree));
  }

  setIsAllDay(isAllDay) {
    this.store.dispatch(new fromTravelActions.SearchByIsAllDayAction(isAllDay))
  }
}

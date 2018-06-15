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
  locations:{id:number, text:string}[];
  searchResultCount:number;
  chips:{type: string, text: string}[]=[];
  ngOnInit(){
    this.store.dispatch(new fromTravelActions.LoadAttractionsAction());
    this.attractions$ = this.store.select(selectAllAttractions)
                            .pipe(
                              tap(attractions=>this.searchResultCount=attractions.length)
                            );
    this.locations$ = this.store.select(selectLocationsForUI).pipe(
      tap(locations=>this.locations=locations)
    );
    
    this.form = this.fb.group({
      'keyword': '',
      'isAllDay': 0,
      'isFree': 0,
      'locationId': 0
    });

    

    this.form.controls['isFree'].valueChanges.subscribe(
      isFree => //console.log(isFree)
      {
        console.log(isFree);
        if(isFree == 0){
          const index = this.chips.findIndex((chip)=>chip.type == 'isFree');
          this.chips.splice(index, 1);
          this.chips.push({
            type:'isFree', text:'收費'
          });
        }
        if(isFree == 1){
          const index = this.chips.findIndex((chip)=>chip.type == 'isFree');
          this.chips.splice(index, 1);
           this.chips.push({
             type:'isFree', text:'免費'
        });
        }
        if(isFree == 'null' || isFree ==null){
          console.log('isFree null')
          const index = this.chips.findIndex((chip)=>chip.type == 'isFree');
          this.chips.splice(index, 1);
        }
        this.store.dispatch(new fromTravelActions.SearchByIsFreeAction(isFree));
      }
    );

    this.form.controls['locationId'].valueChanges.subscribe(
      locationId => //console.log(locationId)
      {
        
        const locationText=this.locations.find((loc)=>loc.id==locationId).text
        if(locationId){
          const index = this.chips.findIndex((chip)=>chip.type == 'locationId');
          this.chips.splice(index, 1);
           this.chips.push({
             type:'locationId', text:locationText
           });
        }
        if(locationId ==0 || locationId ==null){
          const index = this.chips.findIndex((chip)=>chip.type == 'locationId');
          this.chips.splice(index, 1);
        }

      this.store.dispatch(new fromTravelActions.SearchByLocationAction(locationId));
    );

    this.form.controls['isAllDay'].valueChanges.subscribe(
      isAllDay => //console.log(isAllDay)
      {
        console.log(isAllDay)
        if(isAllDay == 0){
          const index = this.chips.findIndex((chip)=>chip.type == 'isAllDay');
          this.chips.splice(index, 1);
          this.chips.push({
            type:'isAllDay', text:'部分時段'
          });
        }
        if(isAllDay == 1){
          const index = this.chips.findIndex((chip)=>chip.type == 'isAllDay');
          this.chips.splice(index, 1);
           this.chips.push({
             type:'isAllDay', text:'全天開放'
          });
        }
        if(isAllDay == 'null' || isAllDay==null){
          //console.log(isAllDay)
          const index = this.chips.findIndex((chip)=>chip.type == 'isAllDay');
          this.chips.splice(index, 1);
        }
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


  clearFilterByTag(chip:{type:string, text:string}){
    //this.form.controls[chip.type].setValue(null);
  }

  setIsAllDay(isAllDay) {
    this.store.dispatch(new fromTravelActions.SearchByIsAllDayAction(isAllDay))
  }
}

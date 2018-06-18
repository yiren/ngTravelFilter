import { categorys } from './shared/config';
import * as fromTravelActions from './store/actions/travel-info.actions';

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, skip, take, switchMap, mergeMap } from 'rxjs/operators';
import { selectAllAttractions, selectLocationsForUI, selectCurrentPage } from './store/reducers/travel-info.reducer';
import * as _ from 'lodash';
import { AppState } from './store/index';
import { Attraction } from './shared/model/attraction.model';
import { Observable, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  form:FormGroup;
  attractions$:Observable<Attraction[]>;
  attractions:Attraction[];
  paginatedAttractions$:Observable<Attraction[]>;
  locations$:Observable<{id:number, text:string}[]>;
  locations:{id:number, text:string}[];
  filteredResultCount:number;
  chips:{type: string, text: string}[]=[];
  itemsPerPage=5;
  @ViewChild('mdkeyword')
  mdkeyword:ElementRef;
  @ViewChild('xskeyword')
  xskeyword:ElementRef;
  @ViewChild('lgkeyword')
  lgkeyword:ElementRef;

  ngAfterViewInit(){
    //console.log(this.mdkeyword)
    if(this.mdkeyword){
      this.listenToKeywordEvent(this.mdkeyword);
    }

    if(this.xskeyword){
      this.listenToKeywordEvent(this.xskeyword);
    }

    if(this.lgkeyword){
      this.listenToKeywordEvent(this.lgkeyword);
    }

  }

  listenToKeywordEvent(event:ElementRef){
    fromEvent(event.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((event:any)=> 
      //console.log(event.target.value)
      this.store.dispatch(new fromTravelActions.SearchByKeywordAction(event.target.value))
    )
  }

  ngOnInit(){
    this.store.dispatch(new fromTravelActions.LoadAttractionsAction());
    this.attractions$ = this.store.select(selectAllAttractions)
                           
    this.locations$ = this.store.select(selectLocationsForUI).pipe(
      tap(locations=>this.locations=locations)
    );

    this.store.select(selectCurrentPage).pipe(
      switchMap(currentPage => this.attractions$.pipe(
          tap(attractions=>{
            const skipItems=(currentPage-1)*this.itemsPerPage
            this.filteredResultCount=attractions.length;
            this.attractions=_.clone(attractions).splice(skipItems, this.itemsPerPage);
          })
        )
      )
        // .pipe(
        //   skip(5),
        //   take(5),
        //   )
    ).subscribe(console.log)
  
    
    this.form = this.fb.group({
      'keyword': '',
      'isAllDay': 0,
      'isFree': 0,
      'locationId': 0
    });

    

    this.form.controls['isFree'].valueChanges.subscribe(
      isFree => //console.log(isFree)
      {
        //console.log(this.chips);
        //console.log(isFree);
        if(isFree == 2){
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
        if(isFree == 0 || isFree ==null){
          const index = this.chips.findIndex((chip)=>chip.type == 'isFree');
          this.chips.splice(index, 1);
        }
        
        this.store.dispatch(new fromTravelActions.SearchByIsFreeAction(isFree));
      }
    );

    this.form.controls['isAllDay'].valueChanges.subscribe(
      isAllDay => //console.log(isAllDay)
      {
        console.log(this.chips);
        console.log(isAllDay);
        if(isAllDay == 2){
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
        if(isAllDay == 0 || isAllDay==null){
          //console.log(isAllDay)
          const index = this.chips.findIndex((chip)=>chip.type == 'isAllDay');
          this.chips.splice(index, 1);
        }
       
        this.store.dispatch(new fromTravelActions.SearchByIsAllDayAction(isAllDay))
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
        if(locationId == 0 || locationId ==null){
          const index = this.chips.findIndex((chip)=>chip.type == 'locationId');
          this.chips.splice(index, 1);
        }
        
        this.store.dispatch(new fromTravelActions.SearchByLocationAction(parseInt(locationId,10)));
      }
    ); 
  }
  constructor(
    private fb:FormBuilder,
    private store:Store<AppState>
  ){}


  changePage(event:PageChangedEvent){
    this.store.dispatch(new fromTravelActions.SetCurrentPageAction(event.page))
  }

  setLocation(locationId:number) {
    this.store.dispatch(new fromTravelActions.SearchByLocationAction(locationId));
  }

  getTicketInfo(info){
    return info.trim() == '' ? '免費參觀' : info;
  }
  getCount(){
    return this.filteredResultCount;
  }
  setIsFree(isFree) {
    this.store.dispatch(new fromTravelActions.SearchByIsFreeAction(isFree));
  }

  getCategory(id){
    return categorys.find((c)=>c.id == parseInt(id,10)).text
  }

  clearFilterByTag(chip:{type:string, text:string}){
    console.log(this.form.controls[chip.type]);
    this.form.controls[chip.type].setValue(0);
  }

  setIsAllDay(isAllDay) {
    this.store.dispatch(new fromTravelActions.SearchByIsAllDayAction(isAllDay))
  }
}

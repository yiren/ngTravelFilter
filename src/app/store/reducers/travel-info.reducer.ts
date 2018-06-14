import * as _ from 'lodash';
import * as fromActions from '../actions/travel-info.actions';
import * as moment from 'moment';

import { Action, createSelector } from '@ngrx/store';

import { AppState } from '../index';
import { Attraction } from './../../shared/model/attraction.model';

export interface TravelInfoState {
  entities:{[id:string]:Attraction};
  isLoading:boolean;
  isLoaded:boolean;
  locationsForUI:{id:number, text:string}[],
  categoryId:number;
  keyword:string;
  locationId:number;
  isFree:number;
  isAllDay:number;
}
export const initialState: TravelInfoState = {
  entities:null,
  isLoaded:false,
  isLoading:false,
  locationsForUI:null,
  categoryId:null,
  keyword:'',
  locationId:null,
  isFree:null,
  isAllDay:null
};

//Selector
export const getLocationsForUI = (state:TravelInfoState) => state.locationsForUI;
export const getAttractionsEntities= (state:TravelInfoState) =>state.entities;
export const selectTravelState=(state:AppState) =>state.travelInfo;

export const selectAttractionsEntities= createSelector(
  selectTravelState,
  getAttractionsEntities
);

export const selectAllAttractions =createSelector(
  selectAttractionsEntities,
  (entities:{[id:string]:Attraction}) => _.values(entities)
);

export const selectLocationsForUI = createSelector(
  selectTravelState,
  getLocationsForUI
);



export function mapAttractionsToEntities(attractions:Attraction[])
{
  return attractions.reduce(
    (entities: {[id: number]: Attraction}, spot: Attraction) => {
      return {
        ...entities,
        [spot.Id]: spot
      };
    }, {});
}



export function mapLocationsToCollection(attractions:Attraction[]){
  const allZones = attractions.map(record => record.Zone);
    //console.log('allZone', allZone);
  const uniqZones= _.uniq(allZones);
    //console.log(uniqZones);
  let idgen = 0;
  const locations=uniqZones.map(zone=>{
    idgen+=1;
    return {
      id: idgen,
      text: zone
    };
  });

  return [{id:0, text:'All'}, ...locations];
}

export function filterEntitiesByParams(
  entities:{[id:string]:Attraction}, 
  locations:{id:number, text:string}[], 
  locationId:number,
  isFree,
  isAllDay,
  keyword:string
){
  let filteredData = _.values(entities);
  console.log(isAllDay);
  if(isAllDay != null || isAllDay == 2){
    if(isAllDay == 1){
      filteredData = filteredData.filter((attr)=>attr.Opentime.includes('全天候開放'));
      
    } 
    if(isAllDay == 0)
    {
      filteredData = filteredData.filter((attr)=>!(attr.Opentime.includes('全天候開放')));
      
    }
  }
  
  if(isFree !== null){
    if(isFree ==1){    
      filteredData=filteredData.filter((attr)=>!(attr.Ticketinfo.includes('票') || attr.Ticketinfo.includes('元')));
      console.log(isFree)
    } 
    if(isFree ==0){
      console.log(isFree)
      filteredData=filteredData.filter((attr)=>attr.Ticketinfo.includes('票') || attr.Ticketinfo.includes('元'));
    }
  }
  //console.log(filteredData);
  if(locationId){
    const location=locations.find((l)=>l.id == locationId)
    filteredData=filteredData.filter((attr)=>attr.Zone.includes(location.text));
  }
  
  if (keyword){
    if (keyword.trim() != '') {
    filteredData = filteredData.filter((attr)=>
    attr.Name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
    attr.Description.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    }
  }
  console.log(filteredData);
  return mapAttractionsToEntities(filteredData);
}

export function travelReducer(state = initialState, action: fromActions.TravelInfoActions): TravelInfoState {
  switch (action.type) {

    case (fromActions.TravelInfoActionTypes.LoadAttractionsAction):{
      return {
        ...state,
        isLoaded:false,
        isLoading:true
      };
    }

    case (fromActions.TravelInfoActionTypes.LoadAttractionsSuccessAction):{
      const data=action.payload;

      const entities=mapAttractionsToEntities(data);

      return {
        ...state,
        entities,
        isLoaded:true,
        isLoading:false
      };
    }

    case (fromActions.TravelInfoActionTypes.GenerateLocationsStateAction):{
      const entities = _.cloneDeep(state.entities);
      const data = _.values(entities);
      const locationsForUI = mapLocationsToCollection(data);
      return {
        ...state,
        locationsForUI
      };
    }

    case (fromActions.TravelInfoActionTypes.SearchByKeywordAction):{
      const keyword = action.payload;
      return {
        ...state,
        keyword
      };
    }

    case (fromActions.TravelInfoActionTypes.SearchByLocationAction):{
      const locationId = action.payload;
      return {
        ...state,
        locationId
      };
    }

    case (fromActions.TravelInfoActionTypes.SearchByIsFreeAction):{
      const isFree = action.payload;
      return {
        ...state,
        isFree
      };
    }

    case (fromActions.TravelInfoActionTypes.SearchByIsAllDayAction):{
      const isAllDay = action.payload;
      return {
        ...state,
        isAllDay
      };
    }

    case (fromActions.TravelInfoActionTypes.FilterAttractionsAction):{

      const entities:{[id:number]:Attraction} = _.cloneDeep(state.entities);
      const {locationsForUI} = state;
      const {keyword} = state;
      const {locationId} = state;
      const {isFree} = state;
      const {isAllDay} = state;

      const filteredEntities = filterEntitiesByParams(entities,locationsForUI, locationId, isFree, isAllDay, keyword);
      
      return {
        ...state,
        entities:filteredEntities
      }
    }



    default:
      return state;
  }
}

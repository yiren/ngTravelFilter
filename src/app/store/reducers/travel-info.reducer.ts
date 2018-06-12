import * as _ from 'lodash';
import * as fromActions from '../actions/travel-info.actions';
import * as moment from 'moment';

import { Action } from '@ngrx/store';
import { Attraction } from './../../shared/model/attraction.model';

;

export interface TravelInfoState {
  entities:{[id:string]:Attraction};
  isLoading:boolean;
  isLoaded:boolean;
  locationsForUI:{id:number, text:string}[],
  keyword:string;
  categoryId:number;
  locationId:number;
  isFree:boolean;
  isAllDay:boolean;
}
export const initialState: TravelInfoState = {
  entities:null,
  isLoaded:false,
  isLoading:false,
  locationsForUI:null,
  keyword:null,
  categoryId:undefined,
  locationId:null,
  isFree:null,
  isAllDay:null
};

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
  return uniqZones.map(zone=>{
      idgen+=1;
      return {
        id: idgen,
        text: zone
      };
    });
}

export function filterEntitiesByKeyword(entities:{[id:string]:Attraction}, keyword:string){
  let filteredData = _.values(entities);
  filteredData=filteredData.filter(s=>s.Name.includes(keyword) || s.Description.includes(keyword));
  return filteredData;
}

export function filterEntitiesByLocation(entities:{[id:string]:Attraction}, locations:{id:number, text:string}[], locationId:number){
  let filteredData = _.values(entities);
  const locationText = locations.find((loc) => loc.id === locationId);
  filteredData = filteredData.filter(s => s.Zone.includes(locationText.text));
  return filteredData;
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
      const data = action.payload;
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
        keyword:keyword
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

    

    default:
      return state;
  }
}

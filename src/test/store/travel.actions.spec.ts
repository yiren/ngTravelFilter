import * as fromActions from './../../app/store/actions/travel-info.actions';

import { remoteTestData } from '../service/test.data';

describe('測試travel action', ()=>{

  describe('載入景點資料', ()=>{
    it('載入景點Action', ()=>{
      const action=new fromActions.LoadAttractionsAction();

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.LoadAttractionsAction
      });
    });

    it('完成載入景點Action', ()=>{
      const data=remoteTestData.result.records;
      const action=new fromActions.LoadAttractionsSuccessAction(data);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.LoadAttractionsSuccessAction,
        payload:data
      });
    });

    it('動態產生區域選單資料Action', () => {
      //const data=remoteTestData.result.records;
      const action=new fromActions.GenerateLocationsStateAction();

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.GenerateLocationsStateAction,
      });
    });
  });

  describe('搜尋',()=>{

    it('關鍵字搜尋 Action', ()=>{
      const keyword='愛河';
      const action=new fromActions.SearchByKeywordAction(keyword);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.SearchByKeywordAction,
        payload:keyword
      });
    });

    it('地區搜尋 Action', ()=>{
      const locationId=4;
      const action= new fromActions.SearchByLocationAction(locationId);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.SearchByLocationAction,
        payload:locationId
      });

    });

    it('是否全天開放Action', ()=>{
      const isAllDay=1;
      const action= new fromActions.SearchByIsAllDayAction(isAllDay);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.SearchByIsAllDayAction,
        payload:isAllDay
      });
    });


    it('是否收費Action', ()=>{
      const isFree=0;
      const action= new fromActions.SearchByIsFreeAction(isFree);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.SearchByIsFreeAction,
        payload:isFree
      });
    });

    it('依分類搜尋', ()=>{
      const categoryId = 2;
    });

  });

})

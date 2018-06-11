import * as fromActions from './../../app/store/actions/travel-info.actions';

import { fakeData } from '../service/fake.data';

describe('測試travel action', ()=>{

  describe('載入景點資料', ()=>{
    it('載入景點Action', ()=>{
      const action=new fromActions.LoadAttractionsAction();

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.LoadAttractionsAction
      });
    });

    it('完成載入景點Action', ()=>{
      const data=fakeData.Infos.Info;
      const action=new fromActions.LoadAttractionsSuccessAction(data);

      expect({...action}).toEqual({
        type:fromActions.TravelInfoActionTypes.LoadAttractionsSuccessAction,
        payload:data
      });
    });

    it('extract地區資料 Action', () => {

    });
  });

})

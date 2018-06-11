import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TravelInfoEffects } from './travel-info.effects';

describe('TravelInfoService', () => {
  let actions$: Observable<any>;
  let effects: TravelInfoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TravelInfoEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TravelInfoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

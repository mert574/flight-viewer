import { fromJS } from 'immutable';
import flightsPageReducer from '../reducer';

describe('flightsPageReducer', () => {
  it('returns the initial state', () => {
    expect(flightsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

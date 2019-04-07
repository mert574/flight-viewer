/*
 *
 * FlightsPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  ADD_FLIGHT,
  ADD_FLIGHT_DONE,
  FETCH_ERROR,
  FETCH_FLIGHTS,
  FILTER_SORT_FLIGHTS,
  FILTER_SORT_FLIGHTS_DONE,
  FLIGHTS_FETCHED,
  LOAD_END,
  LOAD_START,
  PAGINATION,
  PAGINATION_DONE,
} from './constants';

export const initialState = fromJS({
  flights: List(),
  filteredFlights: List(),
  currentPage: List(),
  filters: fromJS({
    sortedAs: {},
  }),
  pagination: fromJS({ page: 1, show: 10 }),
  loading: true,
  error: false,
});

function flightsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return state.set('loading', true);
    case LOAD_END:
      return state.set('loading', false);
    case FETCH_ERROR:
      return state.set('error', true);
    case FETCH_FLIGHTS:
      return state
        .set('error', false)
        .set('flights', List())
        .set('filteredFlights', List())
        .set('currentPage', List())
        .setIn(['pagination', 'page'], 1);
    case FLIGHTS_FETCHED:
      return state.set('flights', fromJS(action.payload)).set('error', false);
    case FILTER_SORT_FLIGHTS:
      return state.set('filters', fromJS(action.payload));
    case FILTER_SORT_FLIGHTS_DONE:
      return state.set('filteredFlights', fromJS(action.payload));
    case PAGINATION:
      return state.set('pagination', fromJS(action.payload));
    case PAGINATION_DONE:
      return state.set('currentPage', fromJS(action.payload));
    case ADD_FLIGHT:
      return state.set('newFlight', fromJS(action.payload));
    case ADD_FLIGHT_DONE:
      return state.set('flights', action.payload);
    default:
      return state;
  }
}

export default flightsPageReducer;

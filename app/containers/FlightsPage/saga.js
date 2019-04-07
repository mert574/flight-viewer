import {
  takeLatest,
  takeEvery,
  all,
  call,
  put,
  select,
  delay,
} from 'redux-saga/effects';
import { orderBy, omitBy, pickBy } from 'lodash';
import {
  ADD_FLIGHT,
  FETCH_FLIGHTS,
  FILTER_SORT_FLIGHTS,
  PAGINATION,
} from './constants';
import { searchKeywords } from '../../utils/objectHelpers';
import flightService from '../../services/flightService';
import {
  addNewFlightDoneAction,
  fetchErrorAction,
  filterSortFlightsDoneAction,
  flightsFetchedAction,
  loadEndAction,
  loadStartAction,
  paginationDoneAction,
} from './actions';
import {
  makeSelectFilteredFlights,
  makeSelectFilters,
  makeSelectFlights,
  makeSelectNewFlight,
  makeSelectPagination,
} from './selectors';
import { filterBasedOnTime } from '../../utils/helpers';

export function* fetchFlights() {
  yield delay(50);
  yield put(loadStartAction());
  try {
    const response = yield call(flightService.fetchFlights);
    yield put(flightsFetchedAction(response));
    yield call(filterSortFlights);
  } catch (e) {
    yield put(fetchErrorAction());
    yield call(console.error, e);
  }
  yield put(loadEndAction());
}

export function* filterSortFlights() {
  yield delay(50);

  const filters = yield select(makeSelectFilters());
  const flights = yield select(makeSelectFlights());
  const sortBy = filters.get('sortedAs').toJS();

  const activeFilters = yield call(
    omitBy,
    filters.toJS(),
    filter => typeof filter === 'object' || !filter.trim().length,
  );

  const timeFilters = yield call(
    pickBy,
    filters.toJS(),
    filter =>
      filter &&
      typeof filter === 'object' &&
      typeof filter.getTime === 'function',
  );

  const searchedFlights = yield call(
    searchKeywords,
    flights.toJS(),
    activeFilters,
  );

  const filteredFlights = yield call(
    filterBasedOnTime,
    searchedFlights,
    timeFilters,
  );

  const sortedFlights = yield call(
    orderBy,
    filteredFlights,
    sortBy.key,
    sortBy.order,
  );

  yield put(filterSortFlightsDoneAction(sortedFlights));
  yield call(paginateFlights);
}

export function* addNewFlight() {
  const flights = yield select(makeSelectFlights());
  const newFlight = yield select(makeSelectNewFlight());
  const updatedFlights = flights.push(newFlight);

  yield put(addNewFlightDoneAction(updatedFlights));
  yield call(filterSortFlights);
}

export function* paginateFlights() {
  const pagination = yield select(makeSelectPagination());
  const flights = yield select(makeSelectFilteredFlights());

  const startingIndex = (pagination.get('page') - 1) * pagination.get('show');

  const currentPageFlights = flights.slice(
    startingIndex,
    startingIndex + pagination.get('show'),
  );

  yield put(paginationDoneAction(currentPageFlights));
}

export default function* flightsPageSaga() {
  yield all([
    takeLatest(FETCH_FLIGHTS, fetchFlights),
    takeLatest(FILTER_SORT_FLIGHTS, filterSortFlights),
    takeLatest(PAGINATION, paginateFlights),
    takeEvery(ADD_FLIGHT, addNewFlight),
  ]);
}

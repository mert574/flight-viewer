/*
 *
 * FlightsPage actions
 *
 */

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

export function fetchFlightsAction() {
  return {
    type: FETCH_FLIGHTS,
  };
}

export function flightsFetchedAction(flights) {
  return {
    type: FLIGHTS_FETCHED,
    payload: flights,
  };
}

export function loadStartAction() {
  return {
    type: LOAD_START,
  };
}

export function loadEndAction() {
  return {
    type: LOAD_END,
  };
}

export function fetchErrorAction() {
  return {
    type: FETCH_ERROR,
  };
}

export function filterSortFlightsAction(filters) {
  return {
    type: FILTER_SORT_FLIGHTS,
    payload: filters,
  };
}

export function filterSortFlightsDoneAction(flights) {
  return {
    type: FILTER_SORT_FLIGHTS_DONE,
    payload: flights,
  };
}

export function addNewFlightAction(flight) {
  return {
    type: ADD_FLIGHT,
    payload: flight,
  };
}

export function addNewFlightDoneAction(flights) {
  return {
    type: ADD_FLIGHT_DONE,
    payload: flights,
  };
}

export function paginationAction(pagination) {
  return {
    type: PAGINATION,
    payload: pagination,
  };
}

export function paginationDoneAction(flights) {
  return {
    type: PAGINATION_DONE,
    payload: flights,
  };
}

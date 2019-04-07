import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the flightsPage state domain
 */

const selectFlightsPageDomain = state => state.get('flightsPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectFlights = () =>
  createSelector(selectFlightsPageDomain, it => it.get('flights'));

const makeSelectFilteredFlights = () =>
  createSelector(selectFlightsPageDomain, it => it.get('filteredFlights'));

const makeSelectCurrentPage = () =>
  createSelector(selectFlightsPageDomain, it => it.get('currentPage'));

const makeSelectLoading = () =>
  createSelector(selectFlightsPageDomain, it => it.get('loading'));

const makeSelectError = () =>
  createSelector(selectFlightsPageDomain, it => it.get('error'));

const makeSelectFilters = () =>
  createSelector(selectFlightsPageDomain, it => it.get('filters'));

const makeSelectPagination = () =>
  createSelector(selectFlightsPageDomain, it => it.get('pagination'));

const makeSelectTotalPageCount = () =>
  createSelector(selectFlightsPageDomain, it =>
    Math.ceil(it.get('flights').size / it.getIn(['pagination', 'show'])),
  );

const makeSelectFilteredPageCount = () =>
  createSelector(selectFlightsPageDomain, it =>
    Math.ceil(
      it.get('filteredFlights').size / it.getIn(['pagination', 'show']),
    ),
  );

const makeSelectActivePage = () =>
  createSelector(selectFlightsPageDomain, it =>
    it.getIn(['pagination', 'page']),
  );

const makeSelectNewFlight = () =>
  createSelector(selectFlightsPageDomain, it => it.get('newFlight'));

/**
 * Default selector used by FlightsPage
 */

const makeSelectFlightsPage = () =>
  createSelector(selectFlightsPageDomain, it => it.toJS());

export default makeSelectFlightsPage;
export {
  selectFlightsPageDomain,
  makeSelectFlights,
  makeSelectFilteredFlights,
  makeSelectLoading,
  makeSelectError,
  makeSelectFilters,
  makeSelectNewFlight,
  makeSelectPagination,
  makeSelectTotalPageCount,
  makeSelectFilteredPageCount,
  makeSelectActivePage,
  makeSelectCurrentPage,
};

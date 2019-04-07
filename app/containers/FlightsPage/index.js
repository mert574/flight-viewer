/**
 *
 * FlightsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
} from 'semantic-ui-react';
import CreateFlightModal from '../../components/CreateFlightModal/Loadable';
import FlightsTable from '../../components/FlightsTable/Loadable';
import {
  makeSelectActivePage,
  makeSelectCurrentPage,
  makeSelectError,
  makeSelectFilteredFlights,
  makeSelectFilteredPageCount,
  makeSelectLoading,
  makeSelectPagination,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  addNewFlightAction,
  fetchFlightsAction,
  filterSortFlightsAction,
  paginationAction,
} from './actions';

export class FlightsPage extends React.Component {
  state = {
    createFlightModalVisible: false,
  };

  componentWillMount() {
    this.props.fetchFlights();
  }

  toggleCreateFlightModal = () => {
    this.setState(state => ({
      createFlightModalVisible: !state.createFlightModalVisible,
    }));
  };

  handleCreateFlightModal = (eventType, data) => {
    switch (eventType) {
      case CreateFlightModal.EVENTS.CREATE_CLICKED:
        this.props.addNewFlight(data);
      // eslint-disable-next-line no-fallthrough
      default:
        this.toggleCreateFlightModal();
    }
  };

  handleFlightsTable = (eventType, data) => {
    // eslint-disable-next-line default-case
    switch (eventType) {
      case FlightsTable.EVENTS.INCREMENT_PAGE:
        if (this.props.activePage < this.props.pageCount) {
          this.props.paginate({
            ...this.props.pagination.toJS(),
            page: this.props.activePage + 1,
          });
        }
        break;

      case FlightsTable.EVENTS.DECREMENT_PAGE:
        if (this.props.activePage > 1) {
          this.props.paginate({
            ...this.props.pagination.toJS(),
            page: this.props.activePage - 1,
          });
        }
        break;

      case FlightsTable.EVENTS.SET_PAGE:
        if (data > 0 && data <= this.props.pageCount) {
          this.props.paginate({
            ...this.props.pagination.toJS(),
            page: data,
          });
        }
        break;

      case FlightsTable.EVENTS.FILTER_SORT:
        this.props.filterSortFlights(data);
        break;
    }
  };

  render() {
    const loading = this.props.loading && 'Loading...';
    const error = this.props.error && 'Cannot fetch flight data';

    return (
      <>
        <Helmet>
          <title>Flights Page</title>
          <meta name="description" content="Description of FlightsPage" />
        </Helmet>

        <Grid.Row>
          <Grid.Column
            width="5"
            verticalAlign="middle"
            textAlign="left"
            stretched
          >
            <Header as="h2">
              <Icon name="plane" />
              <Header.Content>
                Flight Company
                <Header.Subheader>Flight Tickets Viewer</Header.Subheader>
              </Header.Content>
            </Header>

            <Button.Group>
              <Button secondary onClick={this.toggleCreateFlightModal}>
                Create a New Flight
              </Button>
              <Button primary onClick={this.props.fetchFlights}>
                Refresh
              </Button>
            </Button.Group>
          </Grid.Column>
          <Grid.Column width="11">
            <Message
              size="large"
              info
              content={loading}
              hidden={!this.props.loading}
            />
            <Message
              size="large"
              error
              content={error}
              hidden={!this.props.error}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Dimmer active={this.props.loading} inverted>
              <Loader />
            </Dimmer>
            <FlightsTable
              flights={this.props.currentPage.toJS()}
              totalPages={this.props.pageCount}
              currentPage={this.props.activePage}
              onEvent={this.handleFlightsTable}
            />
          </Grid.Column>
        </Grid.Row>

        <CreateFlightModal
          visible={this.state.createFlightModalVisible}
          onEvent={this.handleCreateFlightModal}
        />
      </>
    );
  }
}

FlightsPage.propTypes = {
  filterSortFlights: PropTypes.func,
  addNewFlight: PropTypes.func,
  fetchFlights: PropTypes.func,
  paginate: PropTypes.func,
  currentPage: PropTypes.object,
  pagination: PropTypes.object,
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  filteredFlights: makeSelectFilteredFlights(),
  currentPage: makeSelectCurrentPage(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  pagination: makeSelectPagination(),
  pageCount: makeSelectFilteredPageCount(),
  activePage: makeSelectActivePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchFlights: () => dispatch(fetchFlightsAction()),
    filterSortFlights: filters => dispatch(filterSortFlightsAction(filters)),
    paginate: pagination => dispatch(paginationAction(pagination)),
    addNewFlight: flight => dispatch(addNewFlightAction(flight)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'flightsPage', reducer });
const withSaga = injectSaga({ key: 'flightsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FlightsPage);

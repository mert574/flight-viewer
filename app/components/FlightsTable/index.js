/**
 *
 * FlightsTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Input, Menu, Table } from 'semantic-ui-react';
import { range } from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FlightDetail from '../FlightDetail/Loadable';
import 'react-datepicker/dist/react-datepicker.css';

class FlightsTable extends Component {
  static EVENTS = {
    FILTER_SORT: Symbol('FlightsTable/FILTER_SORT'),
    INCREMENT_PAGE: Symbol('FlightsTable/INCREMENT_PAGE'),
    DECREMENT_PAGE: Symbol('FlightsTable/DECREMENT_PAGE'),
    SET_PAGE: Symbol('FlightsTable/SET_PAGE'),
  };

  state = {
    departure: '',
    arrival: '',
    category: '',
    departureTime: moment().toDate(),
    arrivalTime: moment()
      .add(1, 'days')
      .toDate(),
    sortedAs: {
      key: 'id',
      order: 'asc',
    },
  };

  flightDetailKeys = [
    'departure',
    'arrival',
    'category',
    'departureTime',
    'arrivalTime',
  ];

  categoryOptions = [
    { text: 'Business', value: 'business' },
    { text: 'Cheap', value: 'cheap' },
  ];

  eventFactory = eventType => () => {
    this.props.onEvent(eventType, this.state);
  };

  onFilterInputFactory(field) {
    return (e, { value }) => {
      this.setState({ [field]: value }, () => {
        this.props.onEvent(FlightsTable.EVENTS.FILTER_SORT, this.state);
      });
    };
  }

  onDateInputFactory(field) {
    return value =>
      this.onFilterInputFactory(field)(null, {
        value: value ? new Date(value) : null,
      });
  }

  onSortClickFactory(field) {
    return () => {
      this.setState(
        state => {
          const shouldSortAs = { key: field, order: 'asc' };
          if (state.sortedAs.key === field) {
            shouldSortAs.order =
              state.sortedAs.order === 'asc' ? 'desc' : 'asc';
          }
          return { sortedAs: shouldSortAs };
        },
        () => {
          this.props.onEvent(FlightsTable.EVENTS.FILTER_SORT, this.state);
        },
      );
    };
  }

  onPageNumberClickFactory(number) {
    return () => {
      this.props.onEvent(FlightsTable.EVENTS.SET_PAGE, number);
    };
  }

  render() {
    const mappedFlights = this.props.flights.map(flight => (
      <FlightDetail
        key={flight.id}
        flight={flight}
        keys={this.flightDetailKeys}
      />
    ));

    const paginationNumbers = range(1, this.props.totalPages + 1).map(it => (
      <Menu.Item
        key={it}
        active={this.props.currentPage == it}
        onClick={this.onPageNumberClickFactory(it)}
      >
        {it}
      </Menu.Item>
    ));

    return (
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={this.onSortClickFactory('departure')}>
              Departure
            </Table.HeaderCell>
            <Table.HeaderCell onClick={this.onSortClickFactory('arrival')}>
              Arrival
            </Table.HeaderCell>
            <Table.HeaderCell onClick={this.onSortClickFactory('category')}>
              Category
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={this.onSortClickFactory('departureTime')}
            >
              Departure Time
            </Table.HeaderCell>
            <Table.HeaderCell onClick={this.onSortClickFactory('arrivalTime')}>
              Arrival Time
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              <Input
                size="small"
                icon="search"
                onChange={this.onFilterInputFactory('departure')}
                value={this.state.departure}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Input
                size="small"
                icon="search"
                onChange={this.onFilterInputFactory('arrival')}
                value={this.state.arrival}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Dropdown
                clearable
                selection
                size="mini"
                options={this.categoryOptions}
                onChange={this.onFilterInputFactory('category')}
                value={this.state.category}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <DatePicker
                isClearable
                selected={this.state.departureTime}
                onChange={this.onDateInputFactory('departureTime')}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={new Date()}
                timeIntervals={15}
                placeholderText="Departure Time"
                dropdownMode="scroll"
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <DatePicker
                isClearable
                selected={this.state.arrivalTime}
                onChange={this.onDateInputFactory('arrivalTime')}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeIntervals={15}
                placeholderText="Arrival Time"
                dropdownMode="scroll"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{mappedFlights.map(it => it)}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item
                  onClick={this.eventFactory(
                    FlightsTable.EVENTS.DECREMENT_PAGE,
                  )}
                  icon
                >
                  <Icon name="chevron left" />
                </Menu.Item>
                {paginationNumbers}
                <Menu.Item
                  onClick={this.eventFactory(
                    FlightsTable.EVENTS.INCREMENT_PAGE,
                  )}
                  icon
                >
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

FlightsTable.propTypes = {
  flights: PropTypes.array,
  onEvent: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};

export default FlightsTable;

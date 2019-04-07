/**
 *
 * CreateFlightModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Button, Form, Icon, Message, Modal, Radio } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { omitBy } from 'lodash';
import { timeFmt } from '../../utils/helpers';

class CreateFlightModal extends React.PureComponent {
  static EVENTS = {
    DISMISS: Symbol('CreateFlightModal/DISMISS'),
    CREATE_CLICKED: Symbol('CreateFlightModal/CREATE_CLICKED'),
  };

  state = {
    id: uuid(),
    category: 'cheap',
    departure: '',
    arrival: '',
    departureTime: new Date(),
    arrivalTime: new Date(),
    error: false,
  };

  onInputFactory(field) {
    return (e, { value }) => {
      this.setState({ [field]: value.trim() });
    };
  }

  onDateSelectFactory(field) {
    return date => this.setState({ [field]: date });
  }

  onEventFactory(eventType) {
    return () => {
      this.setState({ id: uuid() }); // refresh uuid
      this.props.onEvent(eventType, omitBy(this.state, ['error']));
    };
  }

  onSubmit = () => {
    const { departure, arrival } = this.state;
    if (!departure.length || !arrival.length) {
      this.displayError();
      return;
    }

    const data = {
      ...omitBy(this.state, ['error']),
      departureTime: timeFmt(this.state.departureTime),
      arrivalTime: timeFmt(this.state.arrivalTime),
    };

    this.props.onEvent(CreateFlightModal.EVENTS.CREATE_CLICKED, data);
  };

  displayError = () => {
    this.setState({ error: true });
    setTimeout(() => this.setState({ error: false }), 3000);
  };

  render() {
    return (
      <Modal
        open={this.props.visible}
        onClose={this.onEventFactory(CreateFlightModal.EVENTS.DISMISS)}
        size="tiny"
      >
        <Modal.Header>Create a New Flight</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group inline>
              <label>Category</label>
              <Form.Field
                control={Radio}
                label="Cheap"
                value="cheap"
                checked={this.state.category === 'cheap'}
                onChange={this.onInputFactory('category')}
              />
              <Form.Field
                control={Radio}
                label="Business"
                value="business"
                checked={this.state.category === 'business'}
                onChange={this.onInputFactory('category')}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                label="Departure From"
                value={this.state.departure}
                onChange={this.onInputFactory('departure')}
                placeholder="Departure City"
              />
              <Form.Input
                label="Arrival To"
                value={this.state.arrival}
                onChange={this.onInputFactory('arrival')}
                placeholder="Arrival City"
              />
            </Form.Group>
            <Form.Group widths="2">
              <div className="field">
                <label>Departure Time</label>
                <DatePicker
                  selected={this.state.departureTime}
                  onChange={this.onDateSelectFactory('departureTime')}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  maxDate={this.state.arrivalTime}
                  showTimeSelect
                  timeIntervals={15}
                  placeholderText="Departure Time"
                  dropdownMode="scroll"
                  className="ui input"
                />
              </div>

              <div className="field">
                <label>Arrival Time</label>
                <div>
                  <DatePicker
                    selected={this.state.arrivalTime}
                    onChange={this.onDateSelectFactory('arrivalTime')}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={this.state.departureTime}
                    showTimeSelect
                    timeIntervals={15}
                    placeholderText="Arrival Time"
                    dropdownMode="scroll"
                    className="ui input"
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            onClick={this.onEventFactory(CreateFlightModal.EVENTS.DISMISS)}
            id="cancel"
          >
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={this.onSubmit} id="create">
            <Icon name="checkmark" /> Create
          </Button>
          <Message
            error
            content="Please correct your input"
            hidden={!this.state.error}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateFlightModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onEvent: PropTypes.func.isRequired,
};

export default CreateFlightModal;

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Modal } from 'semantic-ui-react';
import CreateFlightModal from '../index';

describe('<CreateFlightModal />', () => {
  it('should render a modal', () => {
    const onEvent = jest.fn();
    const rendered = shallow(<CreateFlightModal visible onEvent={onEvent} />);

    expect(rendered.find(Modal).getElement()).toBeDefined();
  });

  it('should render the form', () => {
    const onEvent = jest.fn();
    const rendered = mount(<CreateFlightModal visible onEvent={onEvent} />);

    expect(rendered.find('form').getElement()).toBeDefined();
  });

  it('should render actions', () => {
    const onEvent = jest.fn();
    const rendered = mount(<CreateFlightModal visible onEvent={onEvent} />);

    expect(rendered.find('.actions').getElement()).toBeDefined();
  });

  it('handles create button correctly', () => {
    const onEvent = jest.fn();
    const rendered = mount(<CreateFlightModal visible onEvent={onEvent} />);
    const createButton = rendered.find('#create').at(0);

    createButton.simulate('click');
    expect(rendered.state().error).toEqual(true);
  });

  it('handles cancel button correctly', () => {
    const onEvent = jest.fn();
    const rendered = mount(<CreateFlightModal visible onEvent={onEvent} />);
    const cancelButton = rendered.find('#cancel').at(0);

    cancelButton.simulate('click');
    expect(onEvent).toHaveBeenCalledTimes(1);
  });
});

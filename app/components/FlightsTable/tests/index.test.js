import React from 'react';
import { render, shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import { Table } from 'semantic-ui-react';
import FlightsTable from '../index';
import FlightDetail from '../../FlightDetail';

describe('<FlightsTable />', () => {
  it('Should render a Table', () => {
    const onEvent = jest.fn();
    const rendered = shallow(<FlightsTable flights={[]} onEvent={onEvent} />);

    expect(rendered.find(Table).getElement()).toBeDefined();
  });

  // it('Should render FlightDetails', () => {
  //   const onEvent = jest.fn();
  //   const flights = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  //   const rendered = render(
  //     <FlightsTable flights={flights} onEvent={onEvent} totalPages={5} currentPage={1}/>,
  //   );
  //
  //   expect(rendered.find(FlightDetail).length).toBe(flights.length);
  // });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import { Table } from 'semantic-ui-react';
import FlightDetail from '../index';

describe('<FlightDetail />', () => {
  it('Should render a TableRow', () => {
    const rendered = shallow(<FlightDetail keys={[]} flight={{}} />);

    expect(rendered.find(Table.Row).length).toBe(1);
  });

  it('Should give error when props are not defined', () => {
    expect(() => mount(<FlightDetail />)).toThrow();
  });

  it('Should render properly', () => {
    const keys = ['a', 'b', 'c'];
    const flight = { a: 1, b: 2, c: 3 };
    const rendered = mount(
      <table>
        <tbody>
          <FlightDetail flight={flight} keys={keys} />
        </tbody>
      </table>,
    );

    expect(rendered.find('td').length).toBe(keys.length);
  });
});

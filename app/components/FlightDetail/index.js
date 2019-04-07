/**
 *
 * FlightDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { startCase } from 'lodash';

function FlightDetail({ flight, keys }) {
  const cells = keys.map(key => (
    <Table.Cell key={key}>
      {key.endsWith('Time') ? flight[key] : startCase(flight[key])}
    </Table.Cell>
  ));

  return <Table.Row>{cells}</Table.Row>;
}

FlightDetail.propTypes = {
  flight: PropTypes.object.isRequired,
  keys: PropTypes.array.isRequired,
};

export default FlightDetail;

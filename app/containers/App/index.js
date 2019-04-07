/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FlightsPage from 'containers/FlightsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Container, Grid } from 'semantic-ui-react';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Container>
      <Grid centered celled>
        <Switch>
          <Route exact path="/" component={FlightsPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Grid>
    </Container>
  );
}

import {
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';

export default ({
  component: Component,
  isPassed,
  redirectPath,
  ...rest,
}) => (
  <Route
    render={props => 1 ?
      <Component {...props}/> :
      <Redirect to={{
        pathname: `${redirectPath}`,
        state: { from: props.location }
      }}
      />
    } {...rest}
  />
);

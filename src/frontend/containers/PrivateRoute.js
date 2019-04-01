/* eslint-disable import/exports-last */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const mapStateToProps = state => ({
  auth: state.auth,
});

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.accessToken) {
        return <Component {...props} />;
      }

      return <Redirect to="/authenticate" />;
    }}
  />
);

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
/* eslint-enable */

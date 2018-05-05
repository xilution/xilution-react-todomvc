import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.idToken) {
                return <Component {...props} />;
            }

            return <Redirect to="/authenticate" />;
        }}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

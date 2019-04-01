/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { signOut } from '../actions';

export const mapStateToProps = state => ({
  auth: state.auth,
});

export const AppHeader = ({ dispatch, auth }) => {
  if (auth.accessToken) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Button
          onClick={() => {
            dispatch(signOut());
            // dispatch(push('/authenticate')); TODO - fix this
          }}
          type="button"
        >
          {'Log Out'}
        </Button>
      </div>
    );
  }

  return <div />;
};

export default connect(mapStateToProps)(AppHeader);
/* eslint-enable */

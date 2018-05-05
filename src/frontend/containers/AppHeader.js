/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Button} from 'react-bootstrap';

import {signOut} from '../actions';

const AppHeader = ({dispatch, auth}) => {
    if (auth.idToken) {
        return (
            <div style={{marginBottom: '20px'}}>
                <Button
                    onClick={() => {
                        dispatch(signOut());
                        dispatch(push('/authenticate'));
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AppHeader);
/* eslint-enable react/prop-types */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {signOut} from '../actions';

const AppHeader = ({dispatch, auth}) => {
    if (auth.idToken) {
        return (
            <div>
                <button
                    onClick={() => {
                        dispatch(signOut());
                        dispatch(push('/authenticate'));
                    }}
                    type="button"
                >
                    {'Log Out'}
                </button>
            </div>
        );
    }

    return <div/>;
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AppHeader);

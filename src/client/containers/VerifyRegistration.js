/* eslint-disable no-return-assign,react/prop-types */
import React from 'react';
import {connect} from 'react-redux';

import {verifyRegistrationSuccess} from '../actions';

const VerifyRegistration = ({dispatch}) => {
    let verificationCode;

    return (
        <div>
            <h2>{'Verify Registration'}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!verificationCode.value.trim()) {
                        return;
                    }

                    // todo - call the verify-registration endpoint
                    dispatch(verifyRegistrationSuccess());
                    verificationCode.value = '';
                }}
            >
                <input ref={(node) => verificationCode = node} />
                <button type="submit">{'Submit'}</button>
            </form>
        </div>
    );
};

export default connect()(VerifyRegistration);
/* eslint-enable no-return-assign,react/prop-types */

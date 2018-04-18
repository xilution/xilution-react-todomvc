/* eslint-disable no-return-assign,react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {registerSuccess} from '../actions';

const Register = ({dispatch}) => {
    let firstName,
        lastName,
        email,
        username,
        password;

    return (
        <div>
            <h2>{'Register'}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (
                        !firstName.value.trim() ||
                        !lastName.value.trim() ||
                        !email.value.trim() ||
                        !username.value.trim() ||
                        !password.value.trim()
                    ) {
                        return;
                    }

                    // todo - call the authenticate endpoint
                    dispatch(registerSuccess('registration-token'));
                    dispatch(push('/verify-registration'));

                    firstName.value = '';
                    lastName.value = '';
                    email.value = '';
                    username.value = '';
                    password.value = '';
                }}
            >
                <input ref={(node) => firstName = node} />
                <input ref={(node) => lastName = node} />
                <input ref={(node) => email = node} />
                <input ref={(node) => username = node} />
                <input ref={(node) => password = node} />
                <button type="submit">{'Submit'}</button>
            </form>
            <Link to="/authenticate">{'Sign In'}</Link>
        </div>
    );
};

export default connect()(Register);
/* eslint-enable no-return-assign,react/prop-types */

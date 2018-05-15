/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios/index';

import {authenticationSuccess} from '../actions';

// eslint-disable-next-line no-undef
const serverUrl = TODOMVC_BACKEND_URL;

const defaultState = {
    verificationCode: ''
};

/* istanbul ignore next */
const mapStateToProps = (state) => ({
    auth: state.auth
});

// eslint-disable-next-line import/exports-last
export class VerifyRegistration extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = defaultState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (
            !this.state.verificationCode.trim()
        ) {
            return;
        }

        try {
            const response = await axios.post(`${serverUrl}verify-user`, {
                code: this.state.verificationCode,
                userRegistrationToken: this.props.auth.userRegistrationToken
            });

            this.props.dispatch(authenticationSuccess(response.data.IdToken));
            this.props.dispatch(push('/todos'));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // eslint-disable-next-line no-alert
            alert('An error has occurred. Check the developer console.');
        }

        this.setState(defaultState);
    }

    render() {
        return (
            <div>
                <h2>{'Verify Registration'}</h2>
                <Form
                    horizontal
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup controlId="verificationCode">
                        <ControlLabel>{'Verification Code'}</ControlLabel>
                        <FormControl
                            name="verificationCode"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.verificationCode}
                        />
                        <HelpBlock>{'Check your email for a Xilution verification code.'}</HelpBlock>
                    </FormGroup>
                    <Button type="submit">{'Submit'}</Button>
                </Form>
            </div>
        );
    }
}

VerifyRegistration.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(VerifyRegistration);
/* eslint-enable react/no-set-state,react/prop-types */

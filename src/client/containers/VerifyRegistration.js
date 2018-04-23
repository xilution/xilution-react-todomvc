/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';

import {authenticationSuccess} from '../actions';

const defaultState = {
    verificationCode: ''
};

class VerifyRegistration extends React.Component {
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

    handleSubmit(event) {
        event.preventDefault();

        if (
            !this.state.verificationCode.trim()
        ) {
            return;
        }

        this.props.dispatch(authenticationSuccess('id-token'));
        this.props.dispatch(push('/todos'));

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

export default connect()(VerifyRegistration);
/* eslint-enable react/no-set-state,react/prop-types */

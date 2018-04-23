/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import axios from 'axios';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

import {registerSuccess} from '../actions';

const defaultState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: ''
};

class Register extends React.Component {
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

    // eslint-disable-next-line complexity
    handleSubmit(event) {
        event.preventDefault();

        if (
            !this.state.firstName.trim() ||
            !this.state.lastName.trim() ||
            !this.state.email.trim() ||
            !this.state.username.trim() ||
            !this.state.password.trim()
        ) {
            return;
        }

        axios.post('https://jxwfbjjp49.execute-api.us-east-1.amazonaws.com/Prod/register-user', this.state).then((response) => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(response, null, 2));

            this.props.dispatch(registerSuccess(response.data.userRegistrationToken));
            this.props.dispatch(push('/verify-registration'));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(error, null, 2));
            // eslint-disable-next-line no-alert
            alert('An error has occurred. Check the developer console.');
        });

        this.setState(defaultState);
    }

    render() {
        return (
            <div>
                <h2>{'Register'}</h2>
                <p>
                    {'Already have an account?'}{' '}
                    <Link to="/authenticate">{'Sign In'}</Link>
                </p>
                <Form
                    horizontal
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup controlId="firstName">
                        <ControlLabel>{'First Name'}</ControlLabel>
                        <FormControl
                            autoComplete="given-name"
                            name="firstName"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.firstName}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <ControlLabel>{'Last Name'}</ControlLabel>
                        <FormControl
                            autoComplete="family-name"
                            name="lastName"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.lastName}
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>{'Email'}</ControlLabel>
                        <FormControl
                            autoComplete="email"
                            name="email"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.email}
                        />
                    </FormGroup>
                    <FormGroup controlId="username">
                        <ControlLabel>{'Username'}</ControlLabel>
                        <FormControl
                            autoComplete="username"
                            name="username"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.username}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>{'Password'}</ControlLabel>
                        <FormControl
                            autoComplete="current-password"
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            value={this.state.password}
                        />
                    </FormGroup>
                    <Button type="submit">{'Submit'}</Button>
                </Form>
            </div>
        );
    }
}

export default connect()(Register);
/* eslint-enable react/no-set-state,react/prop-types */

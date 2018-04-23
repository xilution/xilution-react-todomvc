/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

import {authenticationSuccess} from '../actions';

const defaultState = {
    password: '',
    username: ''
};

class Authenticate extends React.Component {
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
            !this.state.username.trim() ||
            !this.state.password.trim()
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
                <h2>{'Sign In'}</h2>
                <p>
                    {'Don\'t have an account?'}{' '}
                    <Link to="/register">{'Register'}</Link>
                </p>
                <Form
                    horizontal
                    onSubmit={this.handleSubmit}
                >
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

export default connect()(Authenticate);
/* eslint-enable react/no-set-state,react/prop-types */

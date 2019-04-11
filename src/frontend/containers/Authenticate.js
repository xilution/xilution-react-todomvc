/* eslint-disable react/no-set-state,react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios/index';

import LoadingIndicator from '../components/Loading';
import { authenticationSuccess, fetchTodosSuccess } from '../actions';

// eslint-disable-next-line no-undef
const serverUrl = TODOMVC_BACKEND_URL;

const defaultState = {
  loading: false,
  password: '',
  username: '',
};

export const mapStateToProps = state => ({
  auth: state.auth,
});

export class Authenticate extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (
      !this.state.username.trim()
            || !this.state.password.trim()
    ) {
      return;
    }

    try {
      this.setState({ loading: true });

      const credentials = {
        password: this.state.password,
        username: this.state.username,
      };
      const authenticateResponse = await axios.post(`${serverUrl}authenticate`, credentials);

      const todosResponse = await axios.get(`${serverUrl}todos`, {
        headers: {
          authorization: authenticateResponse.data.access_token,
        },
      });

      this.props.dispatch(fetchTodosSuccess(todosResponse.data.content));
      this.props.dispatch(authenticationSuccess(authenticateResponse.data.access_token));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-alert,no-undef
      alert('An error has occurred. See the developer console for details.');
    }

    this.setState(defaultState);
  }

  render() {
    const { auth } = this.props;

    if (auth && auth.accessToken) {
      return <Redirect to="/todos" />;
    }

    const isLoading = this.state.loading;

    return (
      <div>
        {isLoading && <LoadingIndicator />}
        <h2>Sign In</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoComplete="username"
              name="username"
              onChange={this.handleChange}
              type="text"
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="current-password"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Authenticate);
/* eslint-enable */

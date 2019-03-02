/* eslint-disable react/no-set-state,react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Form, FormGroup, ControlLabel, FormControl, Button,
} from 'react-bootstrap';
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

export class Authenticate extends React.Component {
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
          authorization: authenticateResponse.data.IdToken,
        },
      });

      this.props.dispatch(fetchTodosSuccess(todosResponse.data.content));
      this.props.dispatch(authenticationSuccess(authenticateResponse.data.IdToken));
      this.props.dispatch(push('/todos'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-alert,no-undef
      alert('An error has occurred. See the developer console for details.');
    }

    this.setState(defaultState);
  }

  render() {
    const isLoading = this.state.loading;

    return (
      <div>
        {isLoading && <LoadingIndicator /> }
        <h2>Sign In</h2>
        <Form
          horizontal
          onSubmit={this.handleSubmit}
        >
          <FormGroup controlId="username">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoComplete="username"
              name="username"
              onChange={this.handleChange}
              type="text"
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoComplete="current-password"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect()(Authenticate);
/* eslint-enable */

/* eslint-disable max-nested-callbacks */
import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import {
  Form, Button,
} from 'react-bootstrap';
import { get, post } from 'axios/index';

import { Redirect } from 'react-router-dom';
import { fetchTodosSuccess, authenticationSuccess } from '../../../../src/frontend/actions';
import { mapStateToProps, Authenticate } from '../../../../src/frontend/containers/Authenticate';

const chance = new Chance();

jest.mock('axios/index');
jest.mock('../../../../src/frontend/actions');

describe('<Authenticate />', () => {
  let accessToken;
  let dispatch;
  let wrapper;
  let instance;
  let h2;
  let form;
  let userNameFormGroup;
  let userNameControlLabel;
  let userNameFormControl;
  let passwordFormGroup;
  let passwordControlLabel;
  let passwordFormControl;
  let button;

  const renderComponent = () => {
    wrapper = shallow(
      <Authenticate
        auth={{ accessToken }}
        dispatch={dispatch}
      />,
    );
    instance = wrapper.instance();

    h2 = wrapper.children().at(0);
    form = wrapper.children().at(1);
    userNameFormGroup = form.children().at(0);
    userNameControlLabel = userNameFormGroup.children().at(0);
    userNameFormControl = userNameFormGroup.children().at(1);
    passwordFormGroup = form.children().at(1);
    passwordControlLabel = passwordFormGroup.children().at(0);
    passwordFormControl = passwordFormGroup.children().at(1);
    button = form.children().at(2);
  };

  beforeEach(() => {
    accessToken = undefined;
    dispatch = jest.fn();

    renderComponent();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when mapping state to props', () => {
    let state;
    let mappedProps;

    beforeEach(() => {
      state = {
        auth: chance.string(),
      };

      mappedProps = mapStateToProps(state);
    });

    test('it should map properly', () => {
      expect(mappedProps).toEqual({
        auth: state.auth,
      });
    });
  });

  describe('when the component renders', () => {
    describe('when the user is not logged in', () => {
      describe('when is not loading', () => {
        test('it should have an initial state', () => {
          expect(instance.state).toEqual({
            loading: false,
            password: '',
            username: '',
          });
        });

        test('it should render a div as the root element', () => {
          expect(wrapper.type()).toEqual('div');
        });

        test('it should render a h2 element', () => {
          expect(h2.type()).toEqual('h2');
          expect(h2.children().at(0).text()).toEqual('Sign In');
        });

        test('it should render a Form element', () => {
          expect(form.type()).toEqual(Form);
          expect(form.props().onSubmit).toEqual(instance.handleSubmit);
        });

        test('it should render a username form group', () => {
          expect(userNameFormGroup.type()).toEqual(Form.Group);
          expect(userNameFormGroup.props().controlId).toEqual('username');
        });

        test('it should render a username control label', () => {
          expect(userNameControlLabel.type()).toEqual(Form.Label);
          expect(userNameControlLabel.children().at(0).text()).toEqual('Username');
        });

        test('it should render a username form control', () => {
          expect(userNameFormControl.type()).toEqual(Form.Control);
          expect(userNameFormControl.props().autoComplete).toEqual('username');
          expect(userNameFormControl.props().name).toEqual('username');
          expect(userNameFormControl.props().onChange).toEqual(instance.handleChange);
          expect(userNameFormControl.props().type).toEqual('text');
          expect(userNameFormControl.props().value).toEqual('');
        });

        test('it should render a password form group', () => {
          expect(passwordFormGroup.type()).toEqual(Form.Group);
          expect(passwordFormGroup.props().controlId).toEqual('password');
        });

        test('it should render a password control label', () => {
          expect(passwordControlLabel.type()).toEqual(Form.Label);
          expect(passwordControlLabel.children().at(0).text()).toEqual('Password');
        });

        test('it should render a password form control', () => {
          expect(passwordFormControl.type()).toEqual(Form.Control);
          expect(passwordFormControl.props().autoComplete).toEqual('current-password');
          expect(passwordFormControl.props().name).toEqual('password');
          expect(passwordFormControl.props().onChange).toEqual(instance.handleChange);
          expect(passwordFormControl.props().type).toEqual('password');
          expect(passwordFormControl.props().value).toEqual('');
        });

        test('it should render a button', () => {
          expect(button.type()).toEqual(Button);
          expect(button.props().type).toEqual('submit');
          expect(button.children().at(0).text()).toEqual('Submit');
        });
      });
    });

    describe('when the user is logged in', () => {
      beforeEach(() => {
        accessToken = chance.string();

        renderComponent();
      });

      test('it should redirect', () => {
        expect(wrapper.type()).toEqual(Redirect);
        expect(wrapper.props().to).toEqual('/todos');
      });
    });
  });

  describe('when handling change', () => {
    let event;

    describe('when target name is username', () => {
      beforeEach(() => {
        renderComponent();

        event = {
          target: {
            name: 'password',
            value: chance.string(),
          },
        };

        instance.handleChange(event);
      });

      test('it should update the state', () => {
        expect(instance.state).toEqual({
          loading: false,
          password: event.target.value,
          username: '',
        });
      });
    });

    describe('when target name is password', () => {
      beforeEach(() => {
        renderComponent();

        event = {
          target: {
            name: 'username',
            value: chance.string(),
          },
        };

        instance.handleChange(event);
      });

      test('it should update the state', () => {
        expect(instance.state).toEqual({
          loading: false,
          password: '',
          username: event.target.value,
        });
      });
    });
  });

  describe('when handling submit', () => {
    let event;
    let username;
    let password;
    let content;

    describe('when input validation does not pass', () => {
      beforeEach(async () => {
        renderComponent();

        event = {
          preventDefault: jest.fn(),
        };

        await instance.handleSubmit(event);
      });

      test('it should call preventDefault', () => {
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledWith();
      });
    });

    describe('when input validation passed', () => {
      describe('when everything goes right', () => {
        beforeEach(async () => {
          renderComponent();

          username = chance.string();
          password = chance.string();
          instance.setState({
            password,
            username,
          });
          accessToken = chance.string();
          post.mockResolvedValue({
            data: {
              access_token: accessToken,
            },
          });
          content = chance.string();
          get.mockResolvedValue({
            data: {
              content,
            },
          });
          event = {
            preventDefault: jest.fn(),
          };

          await instance.handleSubmit(event);
        });

        test('it should call preventDefault', () => {
          expect(event.preventDefault).toHaveBeenCalledTimes(1);
          expect(event.preventDefault).toHaveBeenCalledWith();
        });

        test('it should post the username and password', () => {
          expect(post).toHaveBeenCalledTimes(1);
          expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/authenticate', {
            password,
            username,
          });
        });

        test('it should get the authenticated users\'s todos', () => {
          expect(get).toHaveBeenCalledTimes(1);
          expect(get).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/todos', {
            headers: {
              authorization: accessToken,
            },
          });
        });

        test('it should call fetchTodosSuccess', () => {
          expect(fetchTodosSuccess).toHaveBeenCalledTimes(1);
          expect(fetchTodosSuccess).toHaveBeenCalledWith(content);
        });

        test('it should call authenticationSuccess', () => {
          expect(authenticationSuccess).toHaveBeenCalledTimes(1);
          expect(authenticationSuccess).toHaveBeenCalledWith(accessToken);
        });

        test('it should call dispatch', () => {
          expect(dispatch).toHaveBeenCalledTimes(2);
        });

        test('it should leave the component ith the default state', () => {
          expect(instance.state).toEqual({
            loading: false,
            password: '',
            username: '',
          });
        });
      });

      describe('when post raises an error', () => {
        let error;

        beforeEach(async () => {
          renderComponent();

          username = chance.string();
          password = chance.string();
          instance.setState({
            password,
            username,
          });
          error = new Error(chance.string());
          post.mockRejectedValue(error);
          global.console.log = jest.fn();
          global.alert = jest.fn();
          event = {
            preventDefault: jest.fn(),
          };

          await instance.handleSubmit(event);
        });

        test('it should call preventDefault', () => {
          expect(event.preventDefault).toHaveBeenCalledTimes(1);
          expect(event.preventDefault).toHaveBeenCalledWith();
        });

        test('it should post the username and password', () => {
          expect(post).toHaveBeenCalledTimes(1);
          expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/authenticate', {
            password,
            username,
          });
        });

        test('it should leave the component with the default state', () => {
          expect(instance.state).toEqual({
            loading: false,
            password: '',
            username: '',
          });
        });

        test('it should call console.log', () => {
          expect(global.console.log).toHaveBeenCalledTimes(1);
          expect(global.console.log).toHaveBeenCalledWith(error);
        });

        test('it should call alert', () => {
          expect(alert).toHaveBeenCalledTimes(1);
          expect(alert).toHaveBeenCalledWith('An error has occurred. See the developer console for details.');
        });
      });

      describe('when get raises an error', () => {
        let error;

        beforeEach(async () => {
          renderComponent();

          username = chance.string();
          password = chance.string();
          instance.setState({
            password,
            username,
          });
          accessToken = chance.string();
          post.mockResolvedValue({
            data: {
              access_token: accessToken,
            },
          });
          error = new Error(chance.string());
          get.mockRejectedValue(error);
          global.console.log = jest.fn();
          global.alert = jest.fn();
          event = {
            preventDefault: jest.fn(),
          };

          await instance.handleSubmit(event);
        });

        test('it should call preventDefault', () => {
          expect(event.preventDefault).toHaveBeenCalledTimes(1);
          expect(event.preventDefault).toHaveBeenCalledWith();
        });

        test('it should post the username and password', () => {
          expect(post).toHaveBeenCalledTimes(1);
          expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/authenticate', {
            password,
            username,
          });
        });

        test('it should get the authenticated users\'s todos', () => {
          expect(get).toHaveBeenCalledTimes(1);
          expect(get).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/todos', {
            headers: {
              authorization: accessToken,
            },
          });
        });

        test('it should leave the component with the default state', () => {
          expect(instance.state).toEqual({
            loading: false,
            password: '',
            username: '',
          });
        });

        test('it should call console.log', () => {
          expect(global.console.log).toHaveBeenCalledTimes(1);
          expect(global.console.log).toHaveBeenCalledWith(error);
        });

        test('it should call alert', () => {
          expect(alert).toHaveBeenCalledTimes(1);
          expect(alert).toHaveBeenCalledWith('An error has occurred. See the developer console for details.');
        });
      });
    });
  });
});
/* eslint-enable */

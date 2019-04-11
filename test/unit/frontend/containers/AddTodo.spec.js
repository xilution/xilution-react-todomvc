import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import {
  Form, FormGroup, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { post } from 'axios/index';

import { createTodo } from '../../../../src/frontend/actions';
import { AddTodo, mapStateToProps } from '../../../../src/frontend/containers/AddTodo';

const chance = new Chance();

jest.mock('axios/index');
jest.mock('../../../../src/frontend/actions');

describe('<AddTodo />', () => {
  let accessToken;
  let dispatch;
  let wrapper;
  let instance;
  let form;
  let formGroup;
  let inputGroup;
  let formControl;
  let inputGroupAppend;
  let button;

  const renderComponent = () => {
    wrapper = shallow(
      <AddTodo
        auth={{ accessToken }}
        dispatch={dispatch}
      />,
    );
    instance = wrapper.instance();

    form = wrapper.children().at(0);
    formGroup = form.children().at(0);
    inputGroup = formGroup.children().at(0);
    formControl = inputGroup.children().at(0);
    inputGroupAppend = inputGroup.children().at(1);
    button = inputGroupAppend.children().at(0);
  };

  beforeEach(() => {
    accessToken = chance.string();
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
    test('it should have an initial state', () => {
      expect(instance.state).toEqual({
        input: '',
        loading: false,
      });
    });

    test('it should render a div as the root element', () => {
      expect(wrapper.type()).toEqual('div');
    });

    test('it should render a Form element', () => {
      expect(form.type()).toEqual(Form);
    });

    test('it should render a FormGroup element', () => {
      expect(formGroup.type()).toEqual(FormGroup);
      expect(formGroup.props().controlId).toEqual('input');
    });

    test('it should render a InputGroup element', () => {
      expect(inputGroup.type()).toEqual(InputGroup);
    });

    test('it should render a FormControl element', () => {
      expect(formControl.type()).toEqual(FormControl);
      expect(formControl.props().name).toEqual('input');
      expect(formControl.props().onChange).toEqual(instance.handleChange);
      expect(formControl.props().type).toEqual('text');
      expect(formControl.props().value).toEqual('');
    });

    test('it should render a InputGroup.Append element', () => {
      expect(inputGroupAppend.type()).toEqual(InputGroup.Append);
    });

    test('it should render a Button element', () => {
      expect(button.type()).toEqual(Button);
      expect(button.props().type).toEqual('submit');
      expect(button.children().at(0).text()).toEqual('Add Todo');
    });
  });

  describe('when handling change', () => {
    let event;

    beforeEach(() => {
      renderComponent();

      event = {
        target: {
          value: chance.string(),
        },
      };

      instance.handleChange(event);
    });

    test('it should update the state', () => {
      expect(instance.state).toEqual({
        input: event.target.value,
        loading: false,
      });
    });
  });

  describe('when handling submit', () => {
    let event;


    let input;


    let id;


    let action;

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
      beforeEach(async () => {
        renderComponent();

        input = chance.sentence();
        instance.setState({ input });
        id = chance.string();
        post.mockResolvedValue({
          headers: {
            location: `${chance.url()}/${id}`,
          },
        });
        action = chance.string();
        createTodo.mockReturnValue(action);
        event = {
          preventDefault: jest.fn(),
        };

        await instance.handleSubmit(event);
      });

      test('it should call preventDefault', () => {
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledWith();
      });

      test('it should post the todo', () => {
        expect(post).toHaveBeenCalledTimes(1);
        expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/todos', {
          completed: false,
          text: input,
        }, {
          headers: {
            authorization: accessToken,
          },
        });
      });

      test('it should call createTodo', () => {
        expect(createTodo).toHaveBeenCalledTimes(1);
        expect(createTodo).toHaveBeenCalledWith({
          completed: false,
          id,
          text: input,
        });
      });

      test('it should call dispatch', () => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(action);
      });

      test('it should leave the component ith the default state', () => {
        expect(instance.state).toEqual({
          input: '',
          loading: false,
        });
      });
    });
  });
});

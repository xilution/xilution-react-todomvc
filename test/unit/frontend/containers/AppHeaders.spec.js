import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import { Button } from 'react-bootstrap';

import { signOut } from '../../../../src/frontend/actions';
import { AppHeader, mapStateToProps } from '../../../../src/frontend/containers/AppHeader';

const chance = new Chance();

jest.mock('../../../../src/frontend/actions');

describe('<AppHeader />', () => {
  let accessToken;
  let dispatch;
  let wrapper;
  let button;

  const renderComponent = () => {
    wrapper = shallow(
      <AppHeader
        auth={{ accessToken }}
        dispatch={dispatch}
      />,
    );

    button = wrapper.children().at(0);
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
    describe('when the accessToken is present', () => {
      test('it should render a div as the root element', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.props().style).toEqual({ marginBottom: '20px' });
      });

      test('it should render a Button element', () => {
        expect(button.type()).toEqual(Button);
        expect(button.props().type).toEqual('button');
        expect(button.children().at(0).text()).toEqual('Log Out');
      });
    });

    describe('when the accessToken is not present', () => {
      beforeEach(() => {
        accessToken = undefined;

        renderComponent();
      });

      test('it should render a div as the root element', () => {
        expect(wrapper.type()).toEqual('div');
      });

      test('it should only render the div', () => {
        expect(wrapper.children()).toHaveLength(0);
      });
    });

    describe('when the button is clicked', () => {
      let action;

      beforeEach(() => {
        action = chance.string();

        signOut.mockReturnValue(action);

        renderComponent();

        button.simulate('click');
      });

      test('it should call signOut', () => {
        expect(signOut).toHaveBeenCalledTimes(1);
        expect(signOut).toHaveBeenCalledWith();
      });

      test('it should call dispatch', () => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});

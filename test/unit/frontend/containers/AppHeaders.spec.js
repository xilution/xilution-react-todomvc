import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {push} from 'react-router-redux';
import {Button} from 'react-bootstrap';

import {signOut} from '../../../../src/frontend/actions';
import {AppHeader, mapStateToProps} from '../../../../src/frontend/containers/AppHeader';

const chance = new Chance();

jest.mock('../../../../src/frontend/actions');
jest.mock('react-router-redux');

describe('<AppHeader />', () => {
    let idToken,
        dispatch,
        wrapper,
        button;

    const renderComponent = () => {
        wrapper = shallow(
            <AppHeader
                auth={{idToken}}
                dispatch={dispatch}
            />
        );

        button = wrapper.children().at(0);
    };

    beforeEach(() => {
        idToken = chance.string();
        dispatch = jest.fn();

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when mapping state to props', () => {
        let state,
            mappedProps;

        beforeEach(() => {
            state = {
                auth: chance.string()
            };

            mappedProps = mapStateToProps(state);
        });

        test('it should map properly', () => {
            expect(mappedProps).toEqual({
                auth: state.auth
            });
        });
    });

    describe('when the component renders', () => {
        describe('when the idToken is present', () => {
            test('it should render a div as the root element', () => {
                expect(wrapper.type()).toEqual('div');
                expect(wrapper.props().style).toEqual({marginBottom: '20px'});
            });

            test('it should render a Button element', () => {
                expect(button.type()).toEqual(Button);
                expect(button.props().type).toEqual('button');
                expect(button.children().at(0).text()).toEqual('Log Out');
            });
        });

        describe('when the idToken is not present', () => {
            beforeEach(() => {
                idToken = undefined;

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
            let action,
                pushResponse;

            beforeEach(() => {
                action = chance.string();

                signOut.mockReturnValue(action);
                push.mockReturnValue(pushResponse);

                renderComponent();

                button.simulate('click');
            });

            test('it should call signOut', () => {
                expect(signOut).toHaveBeenCalledTimes(1);
                expect(signOut).toHaveBeenCalledWith();
            });

            test('it should call push', () => {
                expect(push).toHaveBeenCalledTimes(1);
                expect(push).toHaveBeenCalledWith('/authenticate');
            });

            test('it should call dispatch', () => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenCalledWith(action);
                expect(dispatch).toHaveBeenCalledWith(pushResponse);
            });
        });
    });
});

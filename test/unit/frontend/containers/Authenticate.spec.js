import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {Link} from 'react-router-dom';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

import {Authenticate} from '../../../../src/frontend/containers/Authenticate';

const chance = new Chance();

jest.mock('axios/index');
jest.mock('../../../../src/frontend/actions');

describe('<Authenticate />', () => {
    let dispatch,
        wrapper,
        instance,
        h2,
        p,
        form,
        userNameFormGroup,
        userNameControlLabel,
        userNameFormControl,
        passwordFormGroup,
        passwordControlLabel,
        passwordFormControl,
        button;

    const renderComponent = () => {
        wrapper = shallow(
            <Authenticate
                dispatch={dispatch}
            />
        );
        instance = wrapper.instance();

        h2 = wrapper.children().at(0);
        p = wrapper.children().at(1);
        form = wrapper.children().at(2);
        userNameFormGroup = form.children().at(0);
        userNameControlLabel = userNameFormGroup.children().at(0);
        userNameFormControl = userNameFormGroup.children().at(1);
        passwordFormGroup = form.children().at(1);
        passwordControlLabel = passwordFormGroup.children().at(0);
        passwordFormControl = passwordFormGroup.children().at(1);
        button = form.children().at(2);
    };

    beforeEach(() => {
        dispatch = jest.fn();

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when the component renders', () => {
        test('it should have an initial state', () => {
            expect(instance.state).toEqual({
                password: '',
                username: ''
            });
        });

        test('it should render a div as the root element', () => {
            expect(wrapper.type()).toEqual('div');
        });

        test('it should render a h2 element', () => {
            expect(h2.type()).toEqual('h2');
            expect(h2.children().at(0).text()).toEqual('Sign In');
        });

        test('it should render a p element', () => {
            expect(p.type()).toEqual('p');
            expect(p.children().at(0).text()).toEqual('Don\'t have an account?');
            expect(p.children().at(1).text()).toEqual(' ');
            const link = p.children().at(2);

            expect(link.type()).toEqual(Link);
            expect(link.props().to).toEqual('/register');
            expect(link.children().at(0).text()).toEqual('Register');
        });

        test('it should render a Form element', () => {
            expect(form.type()).toEqual(Form);
            expect(form.props().horizontal).toEqual(true);
            expect(form.props().onSubmit).toEqual(instance.handleSubmit);
        });

        test('it should render a username form group', () => {
            expect(userNameFormGroup.type()).toEqual(FormGroup);
            expect(userNameFormGroup.props().controlId).toEqual('username');
        });

        test('it should render a username control label', () => {
            expect(userNameControlLabel.type()).toEqual(ControlLabel);
            expect(userNameControlLabel.children().at(0).text()).toEqual('Username');
        });

        test('it should render a username form control', () => {
            expect(userNameFormControl.type()).toEqual(FormControl);
            expect(userNameFormControl.props().autoComplete).toEqual('username');
            expect(userNameFormControl.props().name).toEqual('username');
            expect(userNameFormControl.props().onChange).toEqual(instance.handleChange);
            expect(userNameFormControl.props().type).toEqual('text');
            expect(userNameFormControl.props().value).toEqual('');
        });

        test('it should render a password form group', () => {
            expect(passwordFormGroup.type()).toEqual(FormGroup);
            expect(passwordFormGroup.props().controlId).toEqual('password');
        });

        test('it should render a password control label', () => {
            expect(passwordControlLabel.type()).toEqual(ControlLabel);
            expect(passwordControlLabel.children().at(0).text()).toEqual('Password');
        });

        test('it should render a password form control', () => {
            expect(passwordFormControl.type()).toEqual(FormControl);
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

    describe('when handling change', () => {
        let event;

        describe('when target name is username', () => {
            beforeEach(() => {
                renderComponent();

                event = {
                    target: {
                        name: 'password',
                        value: chance.string()
                    }
                };

                instance.handleChange(event);
            });

            test('it should update the state', () => {
                expect(instance.state).toEqual({
                    password: event.target.value,
                    username: ''
                });
            });
        });

        describe('when target name is password', () => {
            beforeEach(() => {
                renderComponent();

                event = {
                    target: {
                        name: 'username',
                        value: chance.string()
                    }
                };

                instance.handleChange(event);
            });

            test('it should update the state', () => {
                expect(instance.state).toEqual({
                    password: '',
                    username: event.target.value
                });
            });
        });
    });
});

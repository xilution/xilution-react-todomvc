/* eslint-disable max-nested-callbacks */
import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {Link} from 'react-router-dom';
import {push} from 'react-router-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {post} from 'axios/index';

import {registerSuccess} from '../../../../src/frontend/actions';
import {Register} from '../../../../src/frontend/containers/Register';

const chance = new Chance();

jest.mock('axios');
jest.mock('react-router-redux');
jest.mock('../../../../src/frontend/actions');

describe('<Register />', () => {
    let dispatch,
        wrapper,
        instance,
        h2,
        p,
        form,
        firstNameFormGroup,
        firstNameControlLabel,
        firstNameFormControl,
        lastNameFormGroup,
        lastNameControlLabel,
        lastNameFormControl,
        emailFormGroup,
        emailControlLabel,
        emailFormControl,
        userNameFormGroup,
        userNameControlLabel,
        userNameFormControl,
        passwordFormGroup,
        passwordControlLabel,
        passwordFormControl,
        button;

    const renderComponent = () => {
        wrapper = shallow(
            <Register
                dispatch={dispatch}
            />
        );
        instance = wrapper.instance();

        h2 = wrapper.children().at(0);
        p = wrapper.children().at(1);
        form = wrapper.children().at(2);
        firstNameFormGroup = form.children().at(0);
        firstNameControlLabel = firstNameFormGroup.children().at(0);
        firstNameFormControl = firstNameFormGroup.children().at(1);
        lastNameFormGroup = form.children().at(1);
        lastNameControlLabel = lastNameFormGroup.children().at(0);
        lastNameFormControl = lastNameFormGroup.children().at(1);
        emailFormGroup = form.children().at(2);
        emailControlLabel = emailFormGroup.children().at(0);
        emailFormControl = emailFormGroup.children().at(1);
        userNameFormGroup = form.children().at(3);
        userNameControlLabel = userNameFormGroup.children().at(0);
        userNameFormControl = userNameFormGroup.children().at(1);
        passwordFormGroup = form.children().at(4);
        passwordControlLabel = passwordFormGroup.children().at(0);
        passwordFormControl = passwordFormGroup.children().at(1);
        button = form.children().at(5);
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
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                username: ''
            });
        });

        test('it should render a div as the root element', () => {
            expect(wrapper.type()).toEqual('div');
        });

        test('it should render a h2 element', () => {
            expect(h2.type()).toEqual('h2');
            expect(h2.children().at(0).text()).toEqual('Register');
        });

        test('it should render a p element', () => {
            expect(p.type()).toEqual('p');
            expect(p.children().at(0).text()).toEqual('Already have an account?');
            expect(p.children().at(1).text()).toEqual(' ');
            const link = p.children().at(2);

            expect(link.type()).toEqual(Link);
            expect(link.props().to).toEqual('/authenticate');
            expect(link.children().at(0).text()).toEqual('Sign In');
        });

        test('it should render a Form element', () => {
            expect(form.type()).toEqual(Form);
            expect(form.props().horizontal).toEqual(true);
            expect(form.props().onSubmit).toEqual(instance.handleSubmit);
        });

        test('it should render a first name form group', () => {
            expect(firstNameFormGroup.type()).toEqual(FormGroup);
            expect(firstNameFormGroup.props().controlId).toEqual('firstName');
        });

        test('it should render a first name control label', () => {
            expect(firstNameControlLabel.type()).toEqual(ControlLabel);
            expect(firstNameControlLabel.children().at(0).text()).toEqual('First Name');
        });

        test('it should render a first name form control', () => {
            expect(firstNameFormControl.type()).toEqual(FormControl);
            expect(firstNameFormControl.props().autoComplete).toEqual('given-name');
            expect(firstNameFormControl.props().name).toEqual('firstName');
            expect(firstNameFormControl.props().onChange).toEqual(instance.handleChange);
            expect(firstNameFormControl.props().type).toEqual('text');
            expect(firstNameFormControl.props().value).toEqual('');
        });

        test('it should render a last name form group', () => {
            expect(lastNameFormGroup.type()).toEqual(FormGroup);
            expect(lastNameFormGroup.props().controlId).toEqual('lastName');
        });

        test('it should render a last name control label', () => {
            expect(lastNameControlLabel.type()).toEqual(ControlLabel);
            expect(lastNameControlLabel.children().at(0).text()).toEqual('Last Name');
        });

        test('it should render a last name form control', () => {
            expect(lastNameFormControl.type()).toEqual(FormControl);
            expect(lastNameFormControl.props().autoComplete).toEqual('family-name');
            expect(lastNameFormControl.props().name).toEqual('lastName');
            expect(lastNameFormControl.props().onChange).toEqual(instance.handleChange);
            expect(lastNameFormControl.props().type).toEqual('text');
            expect(lastNameFormControl.props().value).toEqual('');
        });

        test('it should render a email form group', () => {
            expect(emailFormGroup.type()).toEqual(FormGroup);
            expect(emailFormGroup.props().controlId).toEqual('email');
        });

        test('it should render a email control label', () => {
            expect(emailControlLabel.type()).toEqual(ControlLabel);
            expect(emailControlLabel.children().at(0).text()).toEqual('Email');
        });

        test('it should render a email form control', () => {
            expect(emailFormControl.type()).toEqual(FormControl);
            expect(emailFormControl.props().autoComplete).toEqual('email');
            expect(emailFormControl.props().name).toEqual('email');
            expect(emailFormControl.props().onChange).toEqual(instance.handleChange);
            expect(emailFormControl.props().type).toEqual('text');
            expect(emailFormControl.props().value).toEqual('');
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
                    email: '',
                    firstName: '',
                    lastName: '',
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
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    username: event.target.value
                });
            });
        });
    });

    describe('when handling submit', () => {
        let event,
            firstName,
            lastName,
            email,
            username,
            password,
            userRegistrationToken;

        describe('when input validation does not pass', () => {
            beforeEach(async () => {
                renderComponent();

                event = {
                    preventDefault: jest.fn()
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

                    firstName = chance.string();
                    lastName = chance.string();
                    email = chance.email();
                    username = chance.string();
                    password = chance.string();
                    instance.setState({
                        email,
                        firstName,
                        lastName,
                        password,
                        username
                    });
                    userRegistrationToken = chance.string();
                    post.mockResolvedValue({
                        data: {
                            userRegistrationToken
                        }
                    });
                    event = {
                        preventDefault: jest.fn()
                    };

                    await instance.handleSubmit(event);
                });

                test('it should call preventDefault', () => {
                    expect(event.preventDefault).toHaveBeenCalledTimes(1);
                    expect(event.preventDefault).toHaveBeenCalledWith();
                });

                test('it should post the username and password', () => {
                    expect(post).toHaveBeenCalledTimes(1);
                    expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/register-user', {
                        email,
                        firstName,
                        lastName,
                        password,
                        username
                    });
                });

                test('it should call registerSuccess', () => {
                    expect(registerSuccess).toHaveBeenCalledTimes(1);
                    expect(registerSuccess).toHaveBeenCalledWith(userRegistrationToken);
                });

                test('it should call push', () => {
                    expect(push).toHaveBeenCalledTimes(1);
                });

                test('it should call dispatch', () => {
                    expect(dispatch).toHaveBeenCalledTimes(2);
                });

                test('it should leave the component ith the default state', () => {
                    expect(instance.state).toEqual({
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                        username: ''
                    });
                });
            });

            describe('when post raises an error', () => {
                let error;

                beforeEach(async () => {
                    renderComponent();

                    firstName = chance.string();
                    lastName = chance.string();
                    email = chance.email();
                    username = chance.string();
                    password = chance.string();
                    instance.setState({
                        email,
                        firstName,
                        lastName,
                        password,
                        username
                    });
                    error = new Error(chance.string());
                    post.mockRejectedValue(error);
                    global.console.log = jest.fn();
                    global.alert = jest.fn();
                    event = {
                        preventDefault: jest.fn()
                    };

                    await instance.handleSubmit(event);
                });

                test('it should call preventDefault', () => {
                    expect(event.preventDefault).toHaveBeenCalledTimes(1);
                    expect(event.preventDefault).toHaveBeenCalledWith();
                });

                test('it should post the username and password', () => {
                    expect(post).toHaveBeenCalledTimes(1);
                    expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/register-user', {
                        email,
                        firstName,
                        lastName,
                        password,
                        username
                    });
                });

                test('it should leave the component ith the default state', () => {
                    expect(instance.state).toEqual({
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                        username: ''
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

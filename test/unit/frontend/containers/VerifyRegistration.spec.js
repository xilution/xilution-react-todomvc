/* eslint-disable max-nested-callbacks */
import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {push} from 'react-router-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {post} from 'axios/index';

import {authenticationSuccess} from '../../../../src/frontend/actions';
import {VerifyRegistration} from '../../../../src/frontend/containers/VerifyRegistration';

const chance = new Chance();

jest.mock('axios/index');
jest.mock('react-router-redux');
jest.mock('../../../../src/frontend/actions');

describe('<VerifyRegistration />', () => {
    let auth,
        dispatch,
        wrapper,
        instance,
        h2,
        form,
        verificationCodeFormGroup,
        verificationCodeControlLabel,
        verificationCodeFormControl,
        button;

    const renderComponent = () => {
        wrapper = shallow(
            <VerifyRegistration
                auth={auth}
                dispatch={dispatch}
            />
        );
        instance = wrapper.instance();

        h2 = wrapper.children().at(0);
        form = wrapper.children().at(1);
        verificationCodeFormGroup = form.children().at(0);
        verificationCodeControlLabel = verificationCodeFormGroup.children().at(0);
        verificationCodeFormControl = verificationCodeFormGroup.children().at(1);
        button = form.children().at(1);
    };

    beforeEach(() => {
        auth = {
            userRegistrationToken: chance.string()
        };
        dispatch = jest.fn();

        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when the component renders', () => {
        test('it should have an initial state', () => {
            expect(instance.state).toEqual({
                verificationCode: ''
            });
        });

        test('it should render a div as the root element', () => {
            expect(wrapper.type()).toEqual('div');
        });

        test('it should render a h2 element', () => {
            expect(h2.type()).toEqual('h2');
            expect(h2.children().at(0).text()).toEqual('Verify Registration');
        });

        test('it should render a Form element', () => {
            expect(form.type()).toEqual(Form);
            expect(form.props().horizontal).toEqual(true);
            expect(form.props().onSubmit).toEqual(instance.handleSubmit);
        });

        test('it should render a verification code form group', () => {
            expect(verificationCodeFormGroup.type()).toEqual(FormGroup);
            expect(verificationCodeFormGroup.props().controlId).toEqual('verificationCode');
        });

        test('it should render a verification code control label', () => {
            expect(verificationCodeControlLabel.type()).toEqual(ControlLabel);
            expect(verificationCodeControlLabel.children().at(0).text()).toEqual('Verification Code');
        });

        test('it should render a verification code form control', () => {
            expect(verificationCodeFormControl.type()).toEqual(FormControl);
            expect(verificationCodeFormControl.props().name).toEqual('verificationCode');
            expect(verificationCodeFormControl.props().onChange).toEqual(instance.handleChange);
            expect(verificationCodeFormControl.props().type).toEqual('text');
            expect(verificationCodeFormControl.props().value).toEqual('');
        });

        test('it should render a button', () => {
            expect(button.type()).toEqual(Button);
            expect(button.props().type).toEqual('submit');
            expect(button.children().at(0).text()).toEqual('Submit');
        });
    });

    describe('when handling change', () => {
        let event;

        describe('when target name is password', () => {
            beforeEach(() => {
                renderComponent();

                event = {
                    target: {
                        name: 'verificationCode',
                        value: chance.string()
                    }
                };

                instance.handleChange(event);
            });

            test('it should update the state', () => {
                expect(instance.state).toEqual({
                    verificationCode: event.target.value
                });
            });
        });
    });

    describe('when handling submit', () => {
        let event,
            verificationCode,
            idToken;

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

                    verificationCode = chance.string();
                    instance.setState({
                        verificationCode
                    });
                    idToken = chance.string();
                    post.mockResolvedValue({
                        data: {
                            IdToken: idToken
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

                test('it should post the verification code', () => {
                    expect(post).toHaveBeenCalledTimes(1);
                    expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/verify-user', {
                        code: verificationCode,
                        userRegistrationToken: auth.userRegistrationToken
                    });
                });

                test('it should call authenticationSuccess', () => {
                    expect(authenticationSuccess).toHaveBeenCalledTimes(1);
                    expect(authenticationSuccess).toHaveBeenCalledWith(idToken);
                });

                test('it should call push', () => {
                    expect(push).toHaveBeenCalledTimes(1);
                });

                test('it should call dispatch', () => {
                    expect(dispatch).toHaveBeenCalledTimes(2);
                });

                test('it should leave the component ith the default state', () => {
                    expect(instance.state).toEqual({
                        verificationCode: ''
                    });
                });
            });

            describe('when post raises an error', () => {
                let error;

                beforeEach(async () => {
                    renderComponent();

                    verificationCode = chance.string();
                    instance.setState({
                        verificationCode
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

                test('it should post the verification code', () => {
                    expect(post).toHaveBeenCalledTimes(1);
                    expect(post).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/verify-user', {
                        code: verificationCode,
                        userRegistrationToken: auth.userRegistrationToken
                    });
                });

                test('it should leave the component ith the default state', () => {
                    expect(instance.state).toEqual({
                        verificationCode: ''
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

import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {Form, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import {put} from 'axios/index';

import {createTodo} from '../../../../src/frontend/actions';
import {AddTodo} from '../../../../src/frontend/containers/AddTodo';

const chance = new Chance();

jest.mock('axios/index');
jest.mock('../../../../src/frontend/actions');

describe('<AddTodo />', () => {
    let idToken,
        dispatch,
        wrapper,
        instance,
        form,
        formGroup,
        inputGroup,
        formControl,
        inputGroupButton,
        button;

    const renderComponent = () => {
        idToken = chance.string();
        dispatch = jest.fn();
        wrapper = shallow(
            <AddTodo
                auth={{idToken}}
                dispatch={dispatch}
            />
        );
        instance = wrapper.instance();

        form = wrapper.children().at(0);
        formGroup = form.children().at(0);
        inputGroup = formGroup.children().at(0);
        formControl = inputGroup.children().at(0);
        inputGroupButton = inputGroup.children().at(1);
        button = inputGroupButton.children().at(0);
    };

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when the component renders', () => {
        test('it should have an initial state', () => {
            expect(instance.state).toEqual({
                input: ''
            });
        });

        test('it should render a div ast the root element', () => {
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

        test('it should render a InputGroup.Button element', () => {
            expect(inputGroupButton.type()).toEqual(InputGroup.Button);
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
                    value: chance.string()
                }
            };

            instance.handleChange(event);
        });

        test('it should update the state', () => {
            expect(instance.state).toEqual({
                input: event.target.value
            });
        });
    });

    describe('when handling submit', () => {
        let event,
            input,
            id,
            action;

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
            beforeEach(async () => {
                renderComponent();

                input = chance.sentence();
                instance.setState({input});
                id = chance.string();
                put.mockResolvedValue({
                    headers: {
                        location: `${chance.url()}/${id}`
                    }
                });
                action = chance.string();
                createTodo.mockReturnValue(action);
                event = {
                    preventDefault: jest.fn()
                };

                await instance.handleSubmit(event);
            });

            test('it should call preventDefault', () => {
                expect(event.preventDefault).toHaveBeenCalledTimes(1);
                expect(event.preventDefault).toHaveBeenCalledWith();
            });

            test('it should put the todo', () => {
                expect(put).toHaveBeenCalledTimes(1);
                expect(put).toHaveBeenCalledWith('https://api.xilution.com/not-really/Prod/todos', {
                    completed: false,
                    text: input
                }, {
                    headers: {
                        authorization: idToken
                    }
                });
            });

            test('it should call createTodo', () => {
                expect(createTodo).toHaveBeenCalledTimes(1);
                expect(createTodo).toHaveBeenCalledWith({
                    completed: false,
                    id,
                    text: input
                });
            });

            test('it should call dispatch', () => {
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith(action);
            });

            test('it should leave the component ith the default state', () => {
                expect(instance.state).toEqual({
                    input: ''
                });
            });
        });
    });
});

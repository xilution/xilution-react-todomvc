/* eslint-disable max-nested-callbacks */
import Chance from 'chance';

import {mapStateToProps} from '../../../../src/frontend/containers/VisibleTodoList';

const chance = new Chance();

jest.mock('../../../../src/frontend/actions');

describe('<VisibleTodoList />', () => {
    describe('when mapping state to props', () => {
        let state,
            mappedProps;

        beforeEach(() => {
            state = {
                auth: chance.string(),
                todos: chance.n(() => ({
                    completed: chance.bool(),
                    id: chance.string()
                }), chance.integer({
                    max: 100,
                    min: 0
                })),
                visibilityFilter: chance.word()
            };
        });

        describe('when visibility filter is SHOW_ALL', () => {
            beforeEach(() => {
                state.visibilityFilter = 'SHOW_ALL';

                mappedProps = mapStateToProps(state);
            });

            test('it should return the todos', () => {
                expect(mappedProps).toEqual({
                    auth: state.auth,
                    todos: state.todos
                });
            });
        });

        describe('when visibility filter is SHOW_COMPLETED', () => {
            beforeEach(() => {
                state.visibilityFilter = 'SHOW_COMPLETED';

                mappedProps = mapStateToProps(state);
            });

            test('it should return the todos', () => {
                expect(mappedProps).toEqual({
                    auth: state.auth,
                    todos: state.todos.filter((todo) => todo.completed)
                });
            });
        });

        describe('when visibility filter is SHOW_ACTIVE', () => {
            beforeEach(() => {
                state.visibilityFilter = 'SHOW_ACTIVE';

                mappedProps = mapStateToProps(state);
            });

            test('it should return the todos', () => {
                expect(mappedProps).toEqual({
                    auth: state.auth,
                    todos: state.todos.filter((todo) => !todo.completed)
                });
            });
        });

        describe('when visibility filter is unknown', () => {
            let actualError;

            beforeEach(() => {
                try {
                    mapStateToProps(state);
                } catch (error) {
                    actualError = error;
                }
            });

            test('it should return the todos', () => {
                expect(actualError.message).toEqual(`Unknown filter: ${state.visibilityFilter}`);
            });
        });
    });
});
/* eslint-enable */

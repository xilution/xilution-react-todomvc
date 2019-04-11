/* eslint-disable max-nested-callbacks */
import Chance from 'chance';
import { delete as del, put } from 'axios/index';

import { mapStateToProps, mapDispatchToProps } from '../../../../src/frontend/containers/VisibleTodoList';
import { deleteTodo, toggleTodo } from '../../../../src/frontend/actions';

const chance = new Chance();

jest.mock('../../../../src/frontend/actions');
jest.mock('axios/index');

describe('<VisibleTodoList />', () => {
  describe('when mapping state to props', () => {
    let state;
    let mappedProps;

    beforeEach(() => {
      state = {
        auth: chance.string(),
        todos: chance.n(() => ({
          completed: chance.bool(),
          id: chance.string(),
        }), chance.integer({
          max: 100,
          min: 0,
        })),
        visibilityFilter: chance.word(),
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
          todos: state.todos,
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
          todos: state.todos.filter(todo => todo.completed),
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
          todos: state.todos.filter(todo => !todo.completed),
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

  describe('when mapping dispatch to props', () => {
    let dispatch;
    let mappedProps;

    beforeEach(() => {
      dispatch = jest.fn();

      mappedProps = mapDispatchToProps(dispatch);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('it should map properly', () => {
      expect(typeof mappedProps.deleteTodo).toEqual('function');
      expect(typeof mappedProps.toggleTodo).toEqual('function');
    });

    describe('when deleteTodo is invoked', () => {
      let auth;
      let todo;
      let deleteAction;

      beforeEach(() => {
        auth = {
          accessToken: chance.string(),
        };
        todo = {
          id: chance.string(),
        };
      });

      describe('when everything goes according to plan', () => {
        beforeEach(() => {
          deleteAction = chance.string();
          deleteTodo.mockReturnValue(deleteAction);

          mappedProps.deleteTodo(auth, todo);
        });

        test('it should call deleteTodo', () => {
          expect(deleteTodo).toHaveBeenCalledTimes(1);
          expect(deleteTodo).toHaveBeenCalledWith(todo.id);
        });

        test('it should call dispatch', () => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith(deleteAction);
        });

        test('it should call delete', () => {
          expect(del).toHaveBeenCalledTimes(1);
          expect(del).toHaveBeenCalledWith(`https://api.xilution.com/not-really/Prod/todos/${todo.id}`, {
            headers: {
              authorization: auth.accessToken,
            },
          });
        });
      });

      describe('when del raises an error', () => {
        let error;

        beforeEach(() => {
          deleteAction = chance.string();
          deleteTodo.mockReturnValue(deleteAction);
          error = new Error(chance.string());
          del.mockRejectedValue(error);
          global.alert = jest.fn();
          global.console.log = jest.fn();

          mappedProps.deleteTodo(auth, todo);
        });

        test('it should call deleteTodo', () => {
          expect(deleteTodo).toHaveBeenCalledTimes(1);
          expect(deleteTodo).toHaveBeenCalledWith(todo.id);
        });

        test('it should call dispatch', () => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith(deleteAction);
        });

        test('it should call delete', () => {
          expect(del).toHaveBeenCalledTimes(1);
          expect(del).toHaveBeenCalledWith(`https://api.xilution.com/not-really/Prod/todos/${todo.id}`, {
            headers: {
              authorization: auth.accessToken,
            },
          });
        });

        test('it should call console.log', () => {
          expect(global.console.log).toHaveBeenCalledTimes(1);
          expect(global.console.log).toHaveBeenCalledWith(error);
        });

        test('it should call alert', () => {
          expect(global.alert).toHaveBeenCalledTimes(1);
          expect(global.alert).toHaveBeenCalledWith('An error has occurred. See the developer console for details.');
        });
      });
    });

    describe('when toggleTodo is invoked', () => {
      let auth;
      let todo;
      let toggleAction;

      beforeEach(() => {
        auth = {
          accessToken: chance.string(),
        };
        todo = {
          id: chance.string(),
        };
      });

      describe('when everything goes according to plan', () => {
        beforeEach(() => {
          toggleAction = chance.string();
          toggleTodo.mockReturnValue(toggleAction);

          mappedProps.toggleTodo(auth, todo);
        });

        test('it should call toggleTodo', () => {
          expect(toggleTodo).toHaveBeenCalledTimes(1);
          expect(toggleTodo).toHaveBeenCalledWith(todo.id);
        });

        test('it should call dispatch', () => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith(toggleAction);
        });

        test('it should call put', () => {
          expect(put).toHaveBeenCalledTimes(1);
          expect(put).toHaveBeenCalledWith(`https://api.xilution.com/not-really/Prod/todos/${todo.id}`, {
            completed: !todo.completed,
            id: todo.id,
            text: todo.text,
          }, {
            headers: {
              authorization: auth.accessToken,
            },
          });
        });
      });

      describe('when put raises an error', () => {
        let error;

        beforeEach(() => {
          toggleAction = chance.string();
          toggleTodo.mockReturnValue(toggleAction);
          error = new Error(chance.string());
          put.mockRejectedValue(error);
          global.alert = jest.fn();
          global.console.log = jest.fn();

          mappedProps.toggleTodo(auth, todo);
        });

        test('it should call toggleTodo', () => {
          expect(toggleTodo).toHaveBeenCalledTimes(1);
          expect(toggleTodo).toHaveBeenCalledWith(todo.id);
        });

        test('it should call dispatch', () => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith(toggleAction);
        });

        test('it should call put', () => {
          expect(put).toHaveBeenCalledTimes(1);
          expect(put).toHaveBeenCalledWith(`https://api.xilution.com/not-really/Prod/todos/${todo.id}`, {
            completed: !todo.completed,
            id: todo.id,
            text: todo.text,
          }, {
            headers: {
              authorization: auth.accessToken,
            },
          });
        });

        test('it should call console.log', () => {
          expect(global.console.log).toHaveBeenCalledTimes(1);
          expect(global.console.log).toHaveBeenCalledWith(error);
        });

        test('it should call alert', () => {
          expect(global.alert).toHaveBeenCalledTimes(1);
          expect(global.alert).toHaveBeenCalledWith('An error has occurred. See the developer console for details.');
        });
      });
    });
  });
});
/* eslint-enable */

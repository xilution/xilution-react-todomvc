import Chance from 'chance';

import todos from '../../../../src/frontend/reducers/todos';

const chance = new Chance();

const buildRandomTodos = () => chance.n(() => ({
  [chance.string()]: chance.string(),
}), chance.integer({
  max: 100,
  min: 0,
}));

describe('todos reducer tests', () => {
  let state;
  let todo;

  beforeEach(() => {
    state = buildRandomTodos();
    todo = {
      [chance.string()]: chance.string(),
      id: chance.string(),
    };
  });

  test('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  test('should handle ADD_TODO', () => {
    expect(todos(state, {
      todo,
      type: 'ADD_TODO',
    })).toEqual([
      ...state,
      todo,
    ]);
  });

  test('should handle TOGGLE_TODO', () => {
    const id = chance.string();

    state.push({
      [chance.string()]: chance.string(),
      id,
    });
    state.push({
      [chance.string()]: chance.string(),
      id: chance.string(),
    });

    expect(todos(state, {
      id,
      type: 'TOGGLE_TODO',
    })).toEqual(state.map(_todo => (_todo.id === id
      ? {
        ..._todo,
        completed: !_todo.completed,
      }
      : _todo)));
  });

  test('should handle DELETE_TODO', () => {
    const id = chance.string();

    state.push({
      [chance.string()]: chance.string(),
      id,
    });
    state.push({
      [chance.string()]: chance.string(),
      id: chance.string(),
    });

    expect(todos(state, {
      id,
      type: 'DELETE_TODO',
    })).toEqual(state.filter(_todo => _todo.id !== id));
  });

  test('should handle FETCH_TODOS_SUCCESS', () => {
    const _todos = buildRandomTodos();

    expect(todos(state, {
      todos: _todos,
      type: 'FETCH_TODOS_SUCCESS',
    })).toEqual(_todos);
  });

  test('should handle SIGN_OUT', () => {
    expect(todos(state, {
      type: 'SIGN_OUT',
    })).toEqual([]);
  });
});

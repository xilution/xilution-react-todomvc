import Chance from 'chance';

import * as actions from '../../../../src/frontend/actions/index';

const chance = new Chance();

describe('todo action tests', () => {
  test('createTodo should create ADD_TODO action', () => {
    const text = chance.sentence();

    expect(actions.createTodo({ text })).toEqual({
      todo: { text },
      type: 'ADD_TODO',
    });
  });

  test('deleteTodo should create DELETE_TODO action', () => {
    const id = chance.string();

    expect(actions.deleteTodo(id)).toEqual({
      id,
      type: 'DELETE_TODO',
    });
  });

  test('fetchTodosSuccess should create FETCH_TODOS_SUCCESS action', () => {
    const todos = chance.n(() => ({
      [chance.string()]: chance.string(),
    }), chance.integer({
      max: 100,
      min: 0,
    }));

    expect(actions.fetchTodosSuccess(todos)).toEqual({
      todos,
      type: 'FETCH_TODOS_SUCCESS',
    });
  });

  test('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      filter: 'active',
      type: 'SET_VISIBILITY_FILTER',
    });
  });

  test('toggleTodo should create TOGGLE_TODO action', () => {
    const id = chance.string();

    expect(actions.toggleTodo(id)).toEqual({
      id,
      type: 'TOGGLE_TODO',
    });
  });

  test('authenticationSuccess should create AUTHENTICATION_SUCCESS action', () => {
    const accessToken = chance.string();

    expect(actions.authenticationSuccess(accessToken)).toEqual({
      accessToken,
      type: 'AUTHENTICATION_SUCCESS',
    });
  });

  test('signOut should create SIGN_OUT action', () => {
    expect(actions.signOut()).toEqual({
      type: 'SIGN_OUT',
    });
  });

  test('it should have proper visibility filters', () => {
    expect(actions.VisibilityFilters).toEqual({
      SHOW_ACTIVE: 'SHOW_ACTIVE',
      SHOW_ALL: 'SHOW_ALL',
      SHOW_COMPLETED: 'SHOW_COMPLETED',
    });
  });
});

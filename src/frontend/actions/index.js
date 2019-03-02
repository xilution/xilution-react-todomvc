export const createTodo = todo => ({
  todo,
  type: 'ADD_TODO',
});

export const deleteTodo = id => ({
  id,
  type: 'DELETE_TODO',
});

export const fetchTodosSuccess = todos => ({
  todos,
  type: 'FETCH_TODOS_SUCCESS',
});

export const setVisibilityFilter = filter => ({
  filter,
  type: 'SET_VISIBILITY_FILTER',
});

export const toggleTodo = id => ({
  id,
  type: 'TOGGLE_TODO',
});

export const authenticationSuccess = accessToken => ({
  accessToken,
  type: 'AUTHENTICATION_SUCCESS',
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const VisibilityFilters = {
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
};

import { connect } from 'react-redux';
import { delete as del, put } from 'axios/index';

import { deleteTodo, toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

// eslint-disable-next-line no-undef
const serverUrl = TODOMVC_BACKEND_URL;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  // eslint-disable-next-line no-alert,no-undef
  alert('An error has occurred. See the developer console for details.');
};

const buildOptions = auth => ({
  headers: {
    authorization: auth.accessToken,
  },
});

export const mapStateToProps = state => ({
  auth: state.auth,
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

export const mapDispatchToProps = dispatch => ({
  deleteTodo: async (auth, todo) => {
    try {
      dispatch(deleteTodo(todo.id));

      await del(`${serverUrl}todos/${todo.id}`, buildOptions(auth));
    } catch (error) {
      handleError(error);
    }
  },
  toggleTodo: async (auth, todo) => {
    try {
      dispatch(toggleTodo(todo.id));

      await put(`${serverUrl}todos/${todo.id}`, {
        completed: !todo.completed,
        id: todo.id,
        text: todo.text,
      }, buildOptions(auth));
    } catch (error) {
      handleError(error);
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

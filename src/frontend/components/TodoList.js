import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import Todo from './Todo';

const TodoList = ({
  auth, todos, toggleTodo, deleteTodo,
}) => (
  <ListGroup>
    {todos.map(todo => (
      <Todo
        deleteTodo={() => deleteTodo(auth, todo)}
        key={todo.id}
        {...todo}
        toggleTodo={() => toggleTodo(auth, todo)}
      />
    ))}
  </ListGroup>
);

TodoList.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default TodoList;

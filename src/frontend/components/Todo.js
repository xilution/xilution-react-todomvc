import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroupItem } from 'react-bootstrap';

const Todo = ({
  toggleTodo, deleteTodo, completed, text,
}) => (
  <ListGroupItem
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
    <Button
      size="sm"
      variant="danger"
      onClick={deleteTodo}
      style={{
        float: 'right',
        marginLeft: '10px',
      }}
    >
      {'Delete'}
    </Button>
    <Button
      size="sm"
      onClick={toggleTodo}
      style={{
        float: 'right',
      }}
    >
      {completed ? 'Activate' : 'Complete'}
    </Button>
  </ListGroupItem>
);

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default Todo;

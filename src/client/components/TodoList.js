import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'react-bootstrap';

import Todo from './Todo';

const TodoList = ({todos, toggleTodo}) => (
    <ListGroup>
        {todos.map((todo) =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => toggleTodo(todo.id)}
            />
        )}
    </ListGroup>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default TodoList;

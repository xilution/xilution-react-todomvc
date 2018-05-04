/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {Button, ListGroupItem} from 'react-bootstrap';

const Todo = ({toggleTodo, deleteTodo, completed, text}) => (
    <ListGroupItem
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
        <Button
            bsSize="xsmall"
            bsStyle="danger"
            onClick={deleteTodo}
            style={{
                float: 'right',
                marginLeft: '10px'
            }}
        >
            {'Delete'}
        </Button>
        <Button
            bsSize="xsmall"
            onClick={toggleTodo}
            style={{
                float: 'right'
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
    toggleTodo: PropTypes.func.isRequired
};

export default Todo;
/* eslint-enable jsx-a11y/click-events-have-key-events */

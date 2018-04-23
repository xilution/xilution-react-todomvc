/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from 'react-bootstrap';

const Todo = ({onClick, completed, text}) => (
    <ListGroupItem
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </ListGroupItem>
);

Todo.propTypes = {
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;
/* eslint-enable jsx-a11y/click-events-have-key-events */

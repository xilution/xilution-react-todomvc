import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import TodoFilters from './TodoFilters';

const Todos = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <TodoFilters />
    </div>
);

export default Todos;

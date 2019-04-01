import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import TodoFilters from './TodoFilters';

const Todos = () => (
  <div>
    <hr />
    <AddTodo />
    <hr />
    <VisibleTodoList />
    <hr />
    <TodoFilters />
  </div>
);

export default Todos;

import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import Footer from './Footer';

const App = () => (
    <div>
        <h1>{'todos'}</h1>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;

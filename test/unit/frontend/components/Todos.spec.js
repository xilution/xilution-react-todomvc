import React from 'react';
import { shallow } from 'enzyme';

import AddTodo from '../../../../src/frontend/containers/AddTodo';
import VisibleTodoList from '../../../../src/frontend/containers/VisibleTodoList';
import TodoFilters from '../../../../src/frontend/components/TodoFilters';
import Todos from '../../../../src/frontend/components/Todos';

describe('<Todos />', () => {
  let wrapper;
  let addTodo;
  let visibleTodoList;
  let todoFilters;

  const renderComponent = () => {
    wrapper = shallow(
      <Todos />,
    );

    const children = wrapper.children();

    addTodo = children.at(1);
    visibleTodoList = children.at(3);
    todoFilters = children.at(5);
  };

  describe('when the component renders', () => {
    beforeEach(() => {
      renderComponent();
    });

    test('it should render a div as the root element', () => {
      expect(wrapper.type()).toEqual('div');
    });

    test('it should render AddTodo', () => {
      expect(addTodo.type()).toEqual(AddTodo);
    });

    test('it should render VisibleTodoList', () => {
      expect(visibleTodoList.type()).toEqual(VisibleTodoList);
    });

    test('it should render TodoFilters', () => {
      expect(todoFilters.type()).toEqual(TodoFilters);
    });
  });
});

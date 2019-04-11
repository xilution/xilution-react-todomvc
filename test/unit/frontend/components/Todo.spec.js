import React from 'react';
import { shallow } from 'enzyme';
import { Button, ListGroupItem } from 'react-bootstrap';
import Chance from 'chance';

import Todo from '../../../../src/frontend/components/Todo';

const chance = new Chance();

describe('<Todo />', () => {
  let wrapper;
  let toggleTodo;
  let deleteTodo;
  let completed;
  let text;
  let todoText;
  let deleteButton;
  let toggleButton;

  const renderComponent = () => {
    toggleTodo = jest.fn();
    deleteTodo = jest.fn();
    completed = chance.bool();
    text = chance.string();

    wrapper = shallow(
      <Todo
        completed={completed}
        deleteTodo={deleteTodo}
        text={text}
        toggleTodo={toggleTodo}
      />,
    );

    const children = wrapper.children();

    todoText = children.at(0);
    deleteButton = children.at(1);
    toggleButton = children.at(2);
  };

  describe('when the component renders', () => {
    beforeEach(() => {
      renderComponent();
    });

    test('it should render a ListGroupItem as the root element', () => {
      expect(wrapper.type()).toEqual(ListGroupItem);
      expect(wrapper.props().style).toEqual({
        textDecoration: completed ? 'line-through' : 'none',
      });
    });

    test('it should render the ListGroupItem children', () => {
      expect(todoText.text()).toEqual(text);
    });

    test('it should render a Delete button', () => {
      expect(deleteButton.type()).toEqual(Button);
      expect(deleteButton.props().size).toEqual('sm');
      expect(deleteButton.props().variant).toEqual('danger');
      expect(deleteButton.props().onClick).toEqual(deleteTodo);
      expect(deleteButton.props().style).toEqual({
        float: 'right',
        marginLeft: '10px',
      });
      expect(deleteButton.children().at(0).text()).toEqual('Delete');
    });

    test('it should render a toggle button', () => {
      expect(toggleButton.type()).toEqual(Button);
      expect(toggleButton.props().size).toEqual('sm');
      expect(toggleButton.props().onClick).toEqual(toggleTodo);
      expect(toggleButton.props().style).toEqual({
        float: 'right',
      });
      expect(toggleButton.children().at(0).text()).toEqual(completed ? 'Activate' : 'Complete');
    });
  });
});

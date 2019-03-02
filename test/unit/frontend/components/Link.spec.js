import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import Chance from 'chance';

import Link from '../../../../src/frontend/components/Link';

const chance = new Chance();

describe('<Link />', () => {
  let wrapper;
  let active;
  let children;
  let onClick;

  const renderComponent = () => {
    active = chance.bool();
    children = chance.string();
    onClick = jest.fn();

    wrapper = shallow(
      <Link
        active={active}
                // eslint-disable-next-line react/no-children-prop
        children={children}
        onClick={onClick}
      />,
    );

    [children] = wrapper.children();
  };

  describe('when the component renders', () => {
    beforeEach(() => {
      renderComponent();
    });

    test('it should render a Button as the root element', () => {
      expect(wrapper.type()).toEqual(Button);
      expect(wrapper.props().disabled).toEqual(active);
      expect(wrapper.props().onClick).toEqual(onClick);
      expect(wrapper.props().style).toEqual({
        marginLeft: '4px',
      });
    });

    test('it should render the Button children', () => {
      expect(children).toEqual(children);
    });
  });
});

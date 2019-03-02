import React from 'react';
import { shallow } from 'enzyme';

import FilterLink from '../../../../src/frontend/containers/FilterLink';
import { VisibilityFilters } from '../../../../src/frontend/actions/index';
import Footer from '../../../../src/frontend/components/TodoFilters';

describe('<Footer />', () => {
  let wrapper;
  let span;
  let allFilterLink;
  let activeFilterLink;
  let completedFilterLink;

  const renderComponent = () => {
    wrapper = shallow(
      <Footer />,
    );

    const children = wrapper.children();

    span = children.at(0);
    allFilterLink = children.at(1);
    activeFilterLink = children.at(2);
    completedFilterLink = children.at(3);
  };

  describe('when the component renders', () => {
    beforeEach(() => {
      renderComponent();
    });

    test('it should render a div as the root element', () => {
      expect(wrapper.type()).toEqual('div');
    });

    test('it should render a span', () => {
      expect(span.type()).toEqual('span');
      expect(span.children().at(0).text()).toEqual('Show: ');
    });

    test('it should render an all filter link', () => {
      expect(allFilterLink.type()).toEqual(FilterLink);
      expect(allFilterLink.props().filter).toEqual(VisibilityFilters.SHOW_ALL);
      expect(allFilterLink.children().at(0).text()).toEqual('All');
    });

    test('it should render an active filter link', () => {
      expect(activeFilterLink.type()).toEqual(FilterLink);
      expect(activeFilterLink.props().filter).toEqual(VisibilityFilters.SHOW_ACTIVE);
      expect(activeFilterLink.children().at(0).text()).toEqual('Active');
    });

    test('it should render an completed filter link', () => {
      expect(completedFilterLink.type()).toEqual(FilterLink);
      expect(completedFilterLink.props().filter).toEqual(VisibilityFilters.SHOW_COMPLETED);
      expect(completedFilterLink.children().at(0).text()).toEqual('Completed');
    });
  });
});

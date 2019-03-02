import React from 'react';
import { shallow } from 'enzyme';
import ReactLoading from 'react-loading';

import LoadingIndicator from '../../../../src/frontend/components/Loading';

describe('<LoadingIndicator />', () => {
  let wrapper;
  let overlayDiv;
  let loadingDiv;
  let reactLoading;

  const renderComponent = () => {
    wrapper = shallow(
      <LoadingIndicator />,
    );

    const children = wrapper.children();

    overlayDiv = children.at(0);
    loadingDiv = children.at(1);
    reactLoading = loadingDiv.children().at(0);
  };

  describe('when the component renders', () => {
    beforeEach(() => {
      renderComponent();
    });

    test('it should render a div as the root element', () => {
      expect(wrapper.type()).toEqual('div');
    });

    test('it should render a styled div as the overlay div', () => {
      expect(overlayDiv.type()).toEqual('div');
      expect(overlayDiv.props().style).toEqual({
        background: 'black',
        height: '100%',
        left: '50%',
        opacity: 0.3,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        zIndex: '400',
      });
    });

    test('it should render a styled div as the loading div', () => {
      expect(loadingDiv.type()).toEqual('div');
      expect(loadingDiv.props().style).toEqual({
        left: '50%',
        margin: '0',
        position: 'fixed',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '500',
      });
    });

    test('it should render ReactLoading', () => {
      expect(reactLoading.type()).toEqual(ReactLoading);
      expect(reactLoading.props().type).toEqual('spinningBubbles');
      expect(reactLoading.props().color).toEqual('#6297ff');
      expect(reactLoading.props().height).toEqual(100);
      expect(reactLoading.props().width).toEqual(100);
    });
  });
});

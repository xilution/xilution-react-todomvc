import React from 'react';
import {shallow} from 'enzyme';
import ReactLoading from 'react-loading';

import LoadingIndicator from '../../../../src/frontend/components/Loading';

describe('<Link />', () => {
    let wrapper,
        reactLoading;

    const renderComponent = () => {
        wrapper = shallow(
            <LoadingIndicator />);

        reactLoading = wrapper.children(0);
    };

    describe('when the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        test('it should render a styled div as the root element', () => {
            expect(wrapper.type()).toEqual('div');
            expect(wrapper.props().style).toEqual({
                left: '50%',
                margin: '0',
                position: 'fixed',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '500'
            });
        });

        test('it should render ReactLoading', () => {
            expect(reactLoading.type()).toEqual(ReactLoading);
            expect(reactLoading.props().type).toEqual('spinningBubbles');
            expect(reactLoading.props().color).toEqual('#ff0000');
            expect(reactLoading.props().height).toEqual(100);
            expect(reactLoading.props().width).toEqual(100);
        });
    });
});

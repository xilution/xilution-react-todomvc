/* eslint-disable max-nested-callbacks */
import Chance from 'chance';

import { mapDispatchToProps, mapStateToProps } from '../../../../src/frontend/containers/FilterLink';
import { setVisibilityFilter } from '../../../../src/frontend/actions';

const chance = new Chance();

jest.mock('../../../../src/frontend/actions');

describe('<FilterLink />', () => {
  describe('when mapping state to props', () => {
    let state;
    let ownProps;
    let mappedProps;

    describe('when own props filter equals the state\'s visibility filter', () => {
      beforeEach(() => {
        state = {
          visibilityFilter: chance.word(),
        };
        ownProps = {
          filter: state.visibilityFilter,
        };

        mappedProps = mapStateToProps(state, ownProps);
      });

      test('it should map properly', () => {
        expect(mappedProps).toEqual({
          active: true,
        });
      });
    });

    describe('when own props filter does not equal the state\'s visibility filter', () => {
      beforeEach(() => {
        state = {
          visibilityFilter: chance.word(),
        };
        ownProps = {
          filter: chance.word(),
        };

        mappedProps = mapStateToProps(state, ownProps);
      });

      test('it should map properly', () => {
        expect(mappedProps).toEqual({
          active: false,
        });
      });
    });
  });

  describe('when mapping dispatch to props', () => {
    let ownProps;


    let dispatch;


    let action;


    let mappedProps;

    beforeEach(() => {
      dispatch = jest.fn();
      ownProps = {
        filter: chance.word(),
      };
      action = chance.string();

      setVisibilityFilter.mockReturnValue(action);

      mappedProps = mapDispatchToProps(dispatch, ownProps);
    });

    test('it should map properly', () => {
      expect(typeof mappedProps.onClick).toEqual('function');
    });

    describe('when onClick is invoked', () => {
      beforeEach(() => {
        mappedProps.onClick();
      });

      test('it should call setVisibilityFilter', () => {
        expect(setVisibilityFilter).toHaveBeenCalledTimes(1);
        expect(setVisibilityFilter).toHaveBeenCalledWith(ownProps.filter);
      });

      test('it should call dispatch', () => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
/* eslint-enable */

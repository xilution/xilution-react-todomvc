import Chance from 'chance';

import visibilityFilter from '../../../../src/frontend/reducers/visibilityFilter';

const chance = new Chance();

describe('visibility filter reducer tests', () => {
  let state;
  let filter;

  beforeEach(() => {
    state = {};
    filter = chance.string();
  });

  test('should handle initial state', () => {
    expect(visibilityFilter(undefined, {})).toEqual('SHOW_ALL');
  });

  test('should handle SET_VISIBILITY_FILTER', () => {
    expect(visibilityFilter(state, {
      filter,
      type: 'SET_VISIBILITY_FILTER',
    })).toEqual(filter);
  });
});

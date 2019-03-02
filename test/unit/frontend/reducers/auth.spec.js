import Chance from 'chance';

import auth from '../../../../src/frontend/reducers/auth';

const chance = new Chance();

describe('auth reducer tests', () => {
  let state;
  let accessToken;

  beforeEach(() => {
    state = {};
    accessToken = chance.string();
  });

  test('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual({});
  });

  test('should handle AUTHENTICATION_SUCCESS', () => {
    expect(auth(state, {
      accessToken,
      type: 'AUTHENTICATION_SUCCESS',
    })).toEqual({
      ...state,
      accessToken,
    });
  });

  test('should handle SIGN_OUT', () => {
    expect(auth(state, {
      type: 'SIGN_OUT',
    })).toEqual({});
  });
});

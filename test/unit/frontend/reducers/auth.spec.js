import Chance from 'chance';

import auth from '../../../../src/frontend/reducers/auth';

const chance = new Chance();

describe('auth reducer tests', () => {
    let state,
        accessToken,
        userRegistrationToken;

    beforeEach(() => {
        state = {};
        accessToken = chance.string();
        userRegistrationToken = chance.string();
    });

    test('should handle initial state', () => {
        expect(auth(undefined, {})).toEqual({});
    });

    test('should handle AUTHENTICATION_SUCCESS', () => {
        expect(auth(state, {
            accessToken,
            type: 'AUTHENTICATION_SUCCESS'
        })).toEqual({
            ...state,
            accessToken
        });
    });

    test('should handle REGISTER_SUCCESS', () => {
        expect(auth(state, {
            type: 'REGISTER_SUCCESS',
            userRegistrationToken
        })).toEqual({
            ...state,
            userRegistrationToken
        });
    });

    test('should handle VERIFY_REGISTRATION_SUCCESS', () => {
        expect(auth(state, {
            accessToken,
            type: 'VERIFY_REGISTRATION_SUCCESS'
        })).toEqual({
            ...state,
            accessToken
        });
    });

    test('should handle SIGN_OUT', () => {
        expect(auth(state, {
            type: 'SIGN_OUT'
        })).toEqual({});
    });
});

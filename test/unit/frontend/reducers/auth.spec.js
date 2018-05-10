import Chance from 'chance';

import auth from '../../../../src/frontend/reducers/auth';

const chance = new Chance();

describe('auth reducer', () => {
    let state,
        idToken,
        userRegistrationToken;

    beforeEach(() => {
        state = {};
        idToken = chance.string();
        userRegistrationToken = chance.string();
    });

    test('should handle initial state', () => {
        expect(auth(undefined, {})).toEqual({});
    });

    test('should handle AUTHENTICATION_SUCCESS', () => {
        expect(auth(state, {
            idToken,
            type: 'AUTHENTICATION_SUCCESS'
        })).toEqual({
            ...state,
            idToken
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
            idToken,
            type: 'VERIFY_REGISTRATION_SUCCESS'
        })).toEqual({
            ...state,
            idToken
        });
    });

    test('should handle SIGN_OUT', () => {
        expect(auth(state, {
            type: 'SIGN_OUT'
        })).toEqual({});
    });
});

import Chance from 'chance';

import {
    buildCommonOptions,
    buildAuthorizedOptions,
    buildAuthenticatedUserAwareOptions,
    buildTypeAwareOptions
} from '../../../src/backend/brokerUtils';

const chance = new Chance();

describe('broker utils tests', () => {
    let xilutionSubscriberApiKey;

    beforeEach(() => {
        xilutionSubscriberApiKey = chance.string();
        process.env.XilutionSubscriberApiKey = xilutionSubscriberApiKey;
    });

    afterEach(() => {
        delete process.env.XilutionSubscriberApiKey;
    });

    test('when building common options, it should return the proper options', () => {
        expect(buildCommonOptions()).toEqual({
            headers: {
                'x-api-key': xilutionSubscriberApiKey
            }
        });
    });

    test('when building authorized options, it should return the proper options', () => {
        const request = {
            parameters: {
                authorization: chance.string()
            }
        };

        expect(buildAuthorizedOptions(request)).toEqual({
            headers: {
                Authorization: request.parameters.authorization,
                'x-api-key': xilutionSubscriberApiKey
            }
        });
    });

    test('when building type aware options, it should return the proper options', () => {
        const request = {
            parameters: {
                authorization: chance.string()
            }
        };
        const authenticatedUser = {
            id: chance.string()
        };
        const type = chance.word();

        expect(buildTypeAwareOptions(request, authenticatedUser, type)).toEqual({
            headers: {
                Authorization: request.parameters.authorization,
                'x-api-key': xilutionSubscriberApiKey,
                'x-xilution-context-user-id': authenticatedUser.id,
                'x-xilution-type': type
            }
        });
    });

    test('when building context user aware options, it should return the proper options', () => {
        const request = {
            parameters: {
                authorization: chance.string()
            }
        };
        const authenticatedUser = {
            id: chance.string()
        };

        expect(buildAuthenticatedUserAwareOptions(request, authenticatedUser)).toEqual({
            headers: {
                Authorization: request.parameters.authorization,
                'x-api-key': xilutionSubscriberApiKey,
                'x-xilution-context-user-id': authenticatedUser.id
            }
        });
    });
});

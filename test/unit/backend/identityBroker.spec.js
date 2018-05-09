import Chance from 'chance';
import {get, post} from 'axios';

import {registerUser, verifyUser, authenticate, getAuthenticatedUser} from '../../../src/backend/identityBroker';
import {buildAuthorizedOptions, buildCommonOptions} from '../../../src/backend/brokerUtils';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');

describe('identity broker tests', () => {
    let request,
        commonOptions,
        authorizedOptions,
        expectedResponse,
        actualResponse;

    beforeEach(() => {
        request = {
            body: chance.string()
        };
        commonOptions = chance.string();
        authorizedOptions = chance.string();
        expectedResponse = {
            data: chance.string()
        };
        process.env.XilutionSubscriberOrgId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
        delete process.env.XilutionSubscriberOrgId;
    });

    describe('when registering users', () => {
        beforeEach(async () => {
            buildCommonOptions.mockReturnValue(commonOptions);
            post.mockResolvedValue(expectedResponse);

            actualResponse = await registerUser(request);
        });

        test('it should return the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('it should call buildCommonOptions', () => {
            expect(buildCommonOptions).toHaveBeenCalledTimes(1);
            expect(buildCommonOptions).toHaveBeenCalledWith();
        });

        test('it should call post', () => {
            expect(post).toHaveBeenCalledTimes(1);
            expect(post).toHaveBeenCalledWith('https://api.xilution.com/business-basics-identity-beta/register-user', {
                ...request.body,
                organizationId: process.env.XilutionSubscriberOrgId
            }, commonOptions);
        });
    });

    describe('when verifying user', () => {
        beforeEach(async () => {
            buildCommonOptions.mockReturnValue(commonOptions);
            post.mockResolvedValue(expectedResponse);

            actualResponse = await verifyUser(request);
        });

        test('it should return the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('it should call buildCommonOptions', () => {
            expect(buildCommonOptions).toHaveBeenCalledTimes(1);
            expect(buildCommonOptions).toHaveBeenCalledWith();
        });

        test('it should call post', () => {
            expect(post).toHaveBeenCalledTimes(1);
            expect(post).toHaveBeenCalledWith('https://api.xilution.com/business-basics-identity-beta/confirm-user-registration', {
                ...request.body,
                productSelections: [
                    'xilution-elements-data-accessor',
                    'xilution-business-basics-identity'
                ]
            }, commonOptions);
        });
    });

    describe('when authenticating', () => {
        beforeEach(async () => {
            buildCommonOptions.mockReturnValue(commonOptions);
            post.mockResolvedValue(expectedResponse);

            actualResponse = await authenticate(request);
        });

        test('it should return the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('it should call buildCommonOptions', () => {
            expect(buildCommonOptions).toHaveBeenCalledTimes(1);
            expect(buildCommonOptions).toHaveBeenCalledWith();
        });

        test('it should call post', () => {
            expect(post).toHaveBeenCalledTimes(1);
            expect(post).toHaveBeenCalledWith('https://api.xilution.com/business-basics-identity-beta/authenticate', request.body, commonOptions);
        });
    });

    describe('when getting authenticated user', () => {
        beforeEach(async () => {
            buildAuthorizedOptions.mockReturnValue(authorizedOptions);
            get.mockResolvedValue(expectedResponse);

            actualResponse = await getAuthenticatedUser(request);
        });

        test('it should return the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse.data);
        });

        test('it should call buildCommonOptions', () => {
            expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
            expect(buildAuthorizedOptions).toHaveBeenCalledWith(request);
        });

        test('it should call get', () => {
            expect(get).toHaveBeenCalledTimes(1);
            expect(get).toHaveBeenCalledWith('https://api.xilution.com/business-basics-identity-beta/me', authorizedOptions);
        });
    });
});

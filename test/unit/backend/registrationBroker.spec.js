import Chance from 'chance';
import {post} from 'axios';

import {registerUser, verifyUser} from '../../../src/backend/registrationBroker';
import {buildCommonOptions} from '../../../src/backend/brokerUtils';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');

describe('identity broker tests', () => {
    let request,
        commonOptions,
        expectedResponse,
        actualResponse;

    beforeEach(() => {
        request = {
            body: chance.string()
        };
        commonOptions = chance.string();
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
            expect(post).toHaveBeenCalledWith('https://test.registration.core.api.xilution.com/register-user', {
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
            expect(post).toHaveBeenCalledWith('https://test.registration.core.api.xilution.com/confirm-user-registration', {
                ...request.body,
                productSelections: [
                    '58c8ae6b6a794b38adcdfcd1c2848e13'
                ]
            }, commonOptions);
        });
    });
});

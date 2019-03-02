import Chance from 'chance';
import {post} from 'axios';

import {authenticate} from '../../../src/backend/authenticationBroker';
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
            expect(post).toHaveBeenCalledWith('https://test.authentication.core.api.xilution.com/oauth/token', request.body, commonOptions);
        });
    });
});

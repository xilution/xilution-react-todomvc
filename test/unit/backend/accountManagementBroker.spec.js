import Chance from 'chance';
import { get } from 'axios';

import { getAuthenticatedUser } from '../../../src/backend/accountManagementBroker';
import { buildAuthorizedOptions } from '../../../src/backend/brokerUtils';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');

describe('identity broker tests', () => {
  let request;
  let authorizedOptions;
  let expectedResponse;
  let actualResponse;

  beforeEach(() => {
    request = {
      body: chance.string(),
    };
    authorizedOptions = chance.string();
    expectedResponse = {
      data: chance.string(),
    };
    process.env.XilutionSubscriberOrganizationId = chance.string();
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.XilutionSubscriberOrganizationId;
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
      expect(get).toHaveBeenCalledWith('https://test.account-management.core.api.xilution.com/me', authorizedOptions);
    });
  });
});

import Chance from 'chance';
import { post } from 'axios';

import { authenticate } from '../../../src/backend/authenticationBroker';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');

describe('identity broker tests', () => {
  let request;
  let expectedResponse;
  let actualResponse;

  beforeEach(() => {
    request = {
      body: chance.string(),
    };
    expectedResponse = {
      data: chance.string(),
    };
    process.env.XilutionClientId = chance.string();
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.XilutionClientId;
  });

  // eslint-disable-next-line no-undef
  describe('when authenticating', () => {
    beforeEach(async () => {
      post.mockResolvedValue(expectedResponse);

      actualResponse = await authenticate(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call post', () => {
      expect(post).toHaveBeenCalledTimes(1);
      expect(post).toHaveBeenCalledWith('https://test.authentication.core.api.xilution.com/oauth/token', {
        ...request.body,
        client_id: process.env.XilutionClientId,
        grant_type: 'password',
        scope: 'read write',
      });
    });
  });
});

import Chance from 'chance';

import {
  buildAuthorizedOptions,
  buildTypeAwareOptions,
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

  test('when building authorized options, it should return the proper options', () => {
    const request = {
      parameters: {
        authorization: chance.string(),
      },
    };

    expect(buildAuthorizedOptions(request)).toEqual({
      headers: {
        Authorization: request.parameters.authorization,
      },
    });
  });

  test('when building type aware options, it should return the proper options', () => {
    const request = {
      parameters: {
        authorization: chance.string(),
      },
    };
    const authenticatedUser = {
      id: chance.string(),
    };
    const type = chance.word();

    expect(buildTypeAwareOptions(request, authenticatedUser, type)).toEqual({
      headers: {
        Authorization: request.parameters.authorization,
        'x-xilution-type': type,
      },
    });
  });
});

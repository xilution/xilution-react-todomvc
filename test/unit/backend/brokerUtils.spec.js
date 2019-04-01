import Chance from 'chance';

import {
  buildAuthorizedOptions,
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
        Authorization: `Bearer ${request.parameters.authorization}`,
      },
    });
  });
});

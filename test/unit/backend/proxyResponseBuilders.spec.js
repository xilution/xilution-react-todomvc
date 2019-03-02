/* eslint-disable max-nested-callbacks */
import Chance from 'chance';
import { v4 } from 'uuid';

import {
  buildErrorProxyResponse,
  buildInputValidationProxyResponse,
  buildSuccessProxyResponse,
} from '../../../src/backend/proxyResponseBuilders';

const chance = new Chance();

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

global.console = {
  log: jest.fn(),
};

describe('proxy response builders tests', () => {
  let expectedErrorId;
  let actualResponse;

  beforeEach(() => {
    expectedErrorId = chance.guid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when building error proxy response', () => {
    let context;


    let error;

    beforeEach(() => {
      context = chance.string();
      error = new Error(chance.sentence());

      v4.mockReturnValue(expectedErrorId);

      actualResponse = buildErrorProxyResponse(context, error);
    });

    test('it should return a properly formatted response', () => {
      expect(actualResponse).toEqual({
        body: JSON.stringify({
          errorId: expectedErrorId,
          message: 'Internal Server Error',
        }),
        headers: {
          'access-control-allow-origin': '*',
          'content-type': 'application/json',
        },
        isBase64Encoded: false,
        statusCode: 500,
      });
    });

    test('it should call v4 once', () => {
      expect(v4).toHaveBeenCalledTimes(1);
      expect(v4).toHaveBeenCalledWith();
    });

    test('it should call console.log once', () => {
      expect(global.console.log).toHaveBeenCalledTimes(1);
      expect(global.console.log).toHaveBeenCalledWith(JSON.stringify({
        context,
        error: error.message,
        errorId: expectedErrorId,
      }));
    });
  });

  describe('when building input validation proxy response', () => {
    let inputValidationResult;

    beforeEach(() => {
      inputValidationResult = {
        error: {
          [chance.string()]: chance.string(),
        },
      };

      actualResponse = buildInputValidationProxyResponse(inputValidationResult);
    });

    test('it should return a properly formatted response', () => {
      expect(actualResponse).toEqual({
        body: JSON.stringify(inputValidationResult.error),
        headers: {
          'access-control-allow-origin': '*',
          'content-type': 'application/json',
        },
        isBase64Encoded: false,
        statusCode: 400,
      });
    });
  });

  describe('when building success proxy response', () => {
    let inputResponse;

    describe('when data is present', () => {
      beforeEach(() => {
        inputResponse = {
          data: {
            [chance.string()]: chance.string(),
          },
          headers: {
            location: chance.url(),
          },
          status: chance.natural(),
        };

        actualResponse = buildSuccessProxyResponse(inputResponse);
      });

      test('it should return a properly formatted response', () => {
        expect(actualResponse).toEqual({
          body: JSON.stringify(inputResponse.data),
          headers: {
            'access-control-allow-origin': '*',
            'access-control-expose-headers': 'location',
            'content-type': 'application/json',
            location: inputResponse.headers.location,
          },
          isBase64Encoded: false,
          statusCode: inputResponse.status,
        });
      });
    });

    describe('when data is not present', () => {
      beforeEach(() => {
        inputResponse = {
          headers: {
            location: chance.url(),
          },
          status: chance.natural(),
        };

        actualResponse = buildSuccessProxyResponse(inputResponse);
      });

      test('it should return a properly formatted response', () => {
        expect(actualResponse).toEqual({
          body: '',
          headers: {
            'access-control-allow-origin': '*',
            'access-control-expose-headers': 'location',
            'content-type': 'application/json',
            location: inputResponse.headers.location,
          },
          isBase64Encoded: false,
          statusCode: inputResponse.status,
        });
      });
    });
  });
});
/* eslint-enable */

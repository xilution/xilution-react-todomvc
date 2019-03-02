/* eslint-disable max-nested-callbacks */
import { validate } from 'joi';
import Chance from 'chance';

import { brokerRequest } from '../../../src/backend/requestAdapter';
import {
  buildInputValidationProxyResponse,
  buildSuccessProxyResponse,
  buildErrorProxyResponse,
} from '../../../src/backend/proxyResponseBuilders';

const chance = new Chance();

jest.mock('joi');
jest.mock('../../../src/backend/proxyResponseBuilders');

describe('request adapter tests', () => {
  describe('when brokering a request', () => {
    let request;
    let schema;
    let func;
    let funcResponse;
    let inputValidationResult;
    let expectedResponse;
    let actualResponse;

    beforeEach(() => {
      request = {
        [chance.string()]: chance.string(),
      };
      schema = chance.string();
      func = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('when no validation errors and func does not raise an error', () => {
      beforeEach(async () => {
        inputValidationResult = {};
        funcResponse = chance.string();

        validate.mockReturnValue(inputValidationResult);
        func.mockResolvedValue(funcResponse);
        buildSuccessProxyResponse.mockReturnValue(expectedResponse);

        actualResponse = await brokerRequest(request, schema, func);
      });

      test('it should return the expected response', () => {
        expect(actualResponse).toEqual(expectedResponse);
      });

      test('it should call validate once', () => {
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(request, schema);
      });

      test('it should call the func', () => {
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(request);
      });

      test('it should call buildSuccessProxyResponse', () => {
        expect(buildSuccessProxyResponse).toHaveBeenCalledTimes(1);
        expect(buildSuccessProxyResponse).toHaveBeenCalledWith(funcResponse);
      });
    });

    describe('when a validation error is found', () => {
      beforeEach(async () => {
        inputValidationResult = {
          error: chance.string(),
        };

        validate.mockReturnValue(inputValidationResult);
        buildInputValidationProxyResponse.mockReturnValue(expectedResponse);

        actualResponse = await brokerRequest(request, schema, func);
      });

      test('it should return the expected response', () => {
        expect(actualResponse).toEqual(expectedResponse);
      });

      test('it should call validate once', () => {
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(request, schema);
      });

      test('it should not call the func', () => {
        expect(func).toHaveBeenCalledTimes(0);
      });

      test('it should call buildInputValidationProxyResponse', () => {
        expect(buildInputValidationProxyResponse).toHaveBeenCalledTimes(1);
        expect(buildInputValidationProxyResponse).toHaveBeenCalledWith(inputValidationResult);
      });
    });

    describe('when the call to the func throws an error', () => {
      let funcError;

      beforeEach(async () => {
        inputValidationResult = {};
        funcError = new Error(chance.string());

        validate.mockReturnValue(inputValidationResult);
        func.mockRejectedValue(funcError);
        buildErrorProxyResponse.mockReturnValue(expectedResponse);

        actualResponse = await brokerRequest(request, schema, func);
      });

      test('it should return the expected response', () => {
        expect(actualResponse).toEqual(expectedResponse);
      });

      test('it should call validate once', () => {
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(request, schema);
      });

      test('it should call the func', () => {
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(request);
      });

      test('it should call buildInputValidationProxyResponse', () => {
        expect(buildErrorProxyResponse).toHaveBeenCalledTimes(1);
        expect(buildErrorProxyResponse).toHaveBeenCalledWith({
          ...request,
          action: func.toString,
        }, funcError);
      });
    });
  });
});
/* eslint-enable */

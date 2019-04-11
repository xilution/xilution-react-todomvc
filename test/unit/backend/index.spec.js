/* eslint-disable max-nested-callbacks */
import Chance from 'chance';

import {
  doAuthenticate,
  doDeleteTodo,
  doFetchTodos,
  doGetTodo,
  doPostTodo,
  doPutTodo,
} from '../../../src/backend/index';
import { brokerRequest } from '../../../src/backend/requestAdapter';
import { authenticate } from '../../../src/backend/authenticationBroker';
import {
  putTodo,
  postTodo,
  getTodo,
  deleteTodo,
  fetchTodos,
} from '../../../src/backend/beagilyBroker';
import {
  authenticateRequestSchema,
  postTodoRequestSchema,
  putTodoRequestSchema,
  getTodoRequestSchema,
  deleteTodoRequestSchema,
  fetchTodosRequestSchema,
} from '../../../src/backend/schemas';

jest.mock('../../../src/backend/requestAdapter');

const chance = new Chance();

describe('index tests', () => {
  let event;
  let context;
  let expectedResponse;
  let actualError;
  let actualResponse;

  beforeEach(() => {
    event = {};
    context = {};

    brokerRequest.mockResolvedValue(expectedResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when authenticating', () => {
    beforeEach((done) => {
      event = {
        body: JSON.stringify({
          [chance.string()]: chance.string(),
        }),
      };

      doAuthenticate(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({ body: JSON.parse(event.body) }, authenticateRequestSchema, authenticate);
    });
  });

  describe('when posting a todo', () => {
    beforeEach((done) => {
      event = {
        body: JSON.stringify({
          [chance.string()]: chance.string(),
        }),
        headers: {
          Authorization: chance.string(),
        },
      };

      doPostTodo(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({
        body: JSON.parse(event.body),
        parameters: {
          authorization: event.headers.Authorization,
        },
      }, postTodoRequestSchema, postTodo);
    });
  });

  describe('when putting a todo', () => {
    beforeEach((done) => {
      event = {
        body: JSON.stringify({
          [chance.string()]: chance.string(),
        }),
        headers: {
          Authorization: chance.string(),
        },
        pathParameters: {
          id: chance.string(),
        },
      };

      doPutTodo(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({
        body: JSON.parse(event.body),
        parameters: {
          authorization: event.headers.Authorization,
          id: event.pathParameters.id,
        },
      }, putTodoRequestSchema, putTodo);
    });
  });

  describe('when getting a todo', () => {
    beforeEach((done) => {
      event = {
        headers: {
          Authorization: chance.string(),
        },
        pathParameters: {
          id: chance.string(),
        },
      };

      doGetTodo(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({
        parameters: {
          authorization: event.headers.Authorization,
          id: event.pathParameters.id,
        },
      }, getTodoRequestSchema, getTodo);
    });
  });

  describe('when deleting a todo', () => {
    beforeEach((done) => {
      event = {
        headers: {
          Authorization: chance.string(),
        },
        pathParameters: {
          id: chance.string(),
        },
      };

      doDeleteTodo(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({
        parameters: {
          authorization: event.headers.Authorization,
          id: event.pathParameters.id,
        },
      }, deleteTodoRequestSchema, deleteTodo);
    });
  });

  describe('when fetching todos', () => {
    beforeEach((done) => {
      event = {
        headers: {
          Authorization: chance.string(),
        },
        pathParameters: {
          id: chance.string(),
        },
      };

      doFetchTodos(event, context, (error, response) => {
        actualError = error;
        actualResponse = response;
        done();
      });
    });

    test('should not raise an error', () => {
      expect(actualError).toBeNull();
    });

    test('should yield the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('should call brokerRequest once with the proper params', () => {
      expect(brokerRequest).toHaveBeenCalledTimes(1);
      expect(brokerRequest).toHaveBeenCalledWith({
        parameters: {
          authorization: event.headers.Authorization,
        },
      }, fetchTodosRequestSchema, fetchTodos);
    });
  });
});
/* eslint-enable */

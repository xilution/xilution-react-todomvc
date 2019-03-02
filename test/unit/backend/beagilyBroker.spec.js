import Chance from 'chance';
import { get, put, delete as del } from 'axios';

import {
  putTodo, getTodo, deleteTodo, fetchTodos, putType,
} from '../../../src/backend/beagilyBroker';
import {
  buildAuthorizedOptions,
  buildAuthenticatedUserAwareOptions,
  buildTypeAwareOptions,
} from '../../../src/backend/brokerUtils';
import { getAuthenticatedUser } from '../../../src/backend/accountManagementBroker';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');
jest.mock('../../../src/backend/accountManagementBroker');

describe('data access broker tests', () => {
  let request;
  let user;
  let authorizedOptions;
  let authenticatedUserAwareOptions;
  let typeAwareOptions;
  let expectedResponse;
  let actualResponse;

  beforeEach(() => {
    request = {
      body: chance.string(),
      parameters: {
        id: chance.string(),
        name: chance.word(),
      },
    };
    user = {
      id: chance.string(),
    };
    authorizedOptions = chance.string();
    authenticatedUserAwareOptions = chance.string();
    typeAwareOptions = chance.string();
    expectedResponse = {
      data: chance.string(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when put todo', () => {
    beforeEach(async () => {
      getAuthenticatedUser.mockResolvedValue(user);
      buildAuthenticatedUserAwareOptions.mockReturnValue(authenticatedUserAwareOptions);
      put.mockResolvedValue(expectedResponse);

      actualResponse = await putTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call getAuthenticatedUser', () => {
      expect(getAuthenticatedUser).toHaveBeenCalledTimes(1);
      expect(getAuthenticatedUser).toHaveBeenCalledWith(request);
    });

    test('it should call buildAuthenticatedUserAwareOptions', () => {
      expect(buildAuthenticatedUserAwareOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthenticatedUserAwareOptions).toHaveBeenCalledWith(request, user);
    });

    test('it should call put', () => {
      expect(put).toHaveBeenCalledTimes(1);
      expect(put).toHaveBeenCalledWith('https://test.beagily.basics.api.xilution.com/things', {
        ...request.body,
        '@type': 'todo',
        owningUserId: user.id,
      }, authenticatedUserAwareOptions);
    });
  });

  describe('when get todo', () => {
    beforeEach(async () => {
      getAuthenticatedUser.mockResolvedValue(user);
      buildTypeAwareOptions.mockReturnValue(typeAwareOptions);
      get.mockResolvedValue(expectedResponse);

      actualResponse = await getTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call getAuthenticatedUser', () => {
      expect(getAuthenticatedUser).toHaveBeenCalledTimes(1);
      expect(getAuthenticatedUser).toHaveBeenCalledWith(request);
    });

    test('it should call buildTypeAwareOptions', () => {
      expect(buildTypeAwareOptions).toHaveBeenCalledTimes(1);
      expect(buildTypeAwareOptions).toHaveBeenCalledWith(request, user, 'todo');
    });

    test('it should call get', () => {
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things/${request.parameters.id}`, typeAwareOptions);
    });
  });

  describe('when delete todo', () => {
    beforeEach(async () => {
      getAuthenticatedUser.mockResolvedValue(user);
      buildTypeAwareOptions.mockReturnValue(typeAwareOptions);
      del.mockResolvedValue(expectedResponse);

      actualResponse = await deleteTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call getAuthenticatedUser', () => {
      expect(getAuthenticatedUser).toHaveBeenCalledTimes(1);
      expect(getAuthenticatedUser).toHaveBeenCalledWith(request);
    });

    test('it should call buildTypeAwareOptions', () => {
      expect(buildTypeAwareOptions).toHaveBeenCalledTimes(1);
      expect(buildTypeAwareOptions).toHaveBeenCalledWith(request, user, 'todo');
    });

    test('it should call del', () => {
      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things/${request.parameters.id}`, typeAwareOptions);
    });
  });

  describe('when fetching todos', () => {
    let searchCriteriaId;


    let startPage;


    let pageSize;

    beforeEach(async () => {
      searchCriteriaId = chance.string();
      startPage = 0;
      pageSize = 100;
      const searchCriteriaResponse = {
        headers: {
          location: `${chance.string()}/${searchCriteriaId}`,
        },
      };

      getAuthenticatedUser.mockResolvedValue(user);
      buildAuthenticatedUserAwareOptions.mockReturnValue(authenticatedUserAwareOptions);
      put.mockResolvedValue(searchCriteriaResponse);
      buildTypeAwareOptions.mockReturnValue(typeAwareOptions);
      get.mockResolvedValue(expectedResponse);

      actualResponse = await fetchTodos(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call getAuthenticatedUser', () => {
      expect(getAuthenticatedUser).toHaveBeenCalledTimes(1);
      expect(getAuthenticatedUser).toHaveBeenCalledWith(request);
    });

    test('it should call buildAuthenticatedUserAwareOptions', () => {
      expect(buildAuthenticatedUserAwareOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthenticatedUserAwareOptions).toHaveBeenCalledWith(request, user);
    });

    test('it should call put', () => {
      expect(put).toHaveBeenCalledTimes(1);
      expect(put).toHaveBeenCalledWith('https://test.beagily.basics.api.xilution.com/things', {
        '@type': 'fetch-todos-search-criteria',
        owningUserId: user.id,
      }, authenticatedUserAwareOptions);
    });

    test('it should call buildTypeAwareOptions', () => {
      expect(buildTypeAwareOptions).toHaveBeenCalledTimes(1);
      expect(buildTypeAwareOptions).toHaveBeenCalledWith(request, user, 'todo');
    });

    test('it should call get', () => {
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}`, typeAwareOptions);
    });
  });

  describe('when put type', () => {
    beforeEach(async () => {
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
      put.mockResolvedValue(expectedResponse);

      actualResponse = await putType(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse.data);
    });

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request);
    });

    test('it should call put', () => {
      expect(put).toHaveBeenCalledTimes(1);
      expect(put).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/types/${request.parameters.name}`, request.body, authorizedOptions);
    });
  });
});

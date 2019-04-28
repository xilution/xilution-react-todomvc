import Chance from 'chance';
import {
  get, put, post, delete as del,
} from 'axios';

import {
  postTodo, putTodo, getTodo, deleteTodo, fetchTodos, putType,
} from '../../../src/backend/beagilyBroker';
import {
  buildAuthorizedOptions,
} from '../../../src/backend/brokerUtils';
import { getAuthenticatedUser } from '../../../src/backend/accountManagementBroker';

const chance = new Chance();

jest.mock('axios');
jest.mock('../../../src/backend/brokerUtils');
jest.mock('../../../src/backend/accountManagementBroker');

describe('beagily broker tests', () => {
  let request;
  let user;
  let authorizedOptions;
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
    expectedResponse = {
      data: chance.string(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when post todo', () => {
    beforeEach(async () => {
      getAuthenticatedUser.mockResolvedValue(user);
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
      post.mockResolvedValue(expectedResponse);

      actualResponse = await postTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call getAuthenticatedUser', () => {
      expect(getAuthenticatedUser).toHaveBeenCalledTimes(1);
      expect(getAuthenticatedUser).toHaveBeenCalledWith(request);
    });

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request, user);
    });

    test('it should call post', () => {
      expect(post).toHaveBeenCalledTimes(1);
      expect(post).toHaveBeenCalledWith('https://test.beagily.basics.api.xilution.com/things', {
        ...request.body,
        '@type': 'todo',
        owningUserId: user.id,
      }, authorizedOptions);
    });
  });

  describe('when put todo', () => {
    beforeEach(async () => {
      getAuthenticatedUser.mockResolvedValue(user);
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
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

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request, user);
    });

    test('it should call put', () => {
      expect(put).toHaveBeenCalledTimes(1);
      expect(put).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things/${request.parameters.id}`, {
        ...request.body,
        '@type': 'todo',
        owningUserId: user.id,
      }, authorizedOptions);
    });
  });

  describe('when get todo', () => {
    beforeEach(async () => {
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
      get.mockResolvedValue(expectedResponse);

      actualResponse = await getTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request);
    });

    test('it should call get', () => {
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things/${request.parameters.id}?type=todo`, authorizedOptions);
    });
  });

  describe('when delete todo', () => {
    beforeEach(async () => {
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
      del.mockResolvedValue(expectedResponse);

      actualResponse = await deleteTodo(request);
    });

    test('it should return the expected response', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(1);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request);
    });

    test('it should call del', () => {
      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things/${request.parameters.id}?type=todo`, authorizedOptions);
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
          Location: `${chance.string()}/${searchCriteriaId}`,
        },
      };

      getAuthenticatedUser.mockResolvedValue(user);
      buildAuthorizedOptions.mockReturnValue(authorizedOptions);
      post.mockResolvedValue(searchCriteriaResponse);
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

    test('it should call post', () => {
      expect(post).toHaveBeenCalledTimes(1);
      expect(post).toHaveBeenCalledWith('https://test.beagily.basics.api.xilution.com/search-criterias', {
        '@type': 'fetch-todos-search-criteria',
        criteria: {},
        owningUserId: user.id,
      }, authorizedOptions);
    });

    test('it should call buildAuthorizedOptions', () => {
      expect(buildAuthorizedOptions).toHaveBeenCalledTimes(2);
      expect(buildAuthorizedOptions).toHaveBeenCalledWith(request);
    });

    test('it should call get', () => {
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(`https://test.beagily.basics.api.xilution.com/things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}&type=todo`, authorizedOptions);
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

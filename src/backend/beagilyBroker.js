import {
  get, put, post, delete as del,
} from 'axios';

import { buildAuthorizedOptions } from './brokerUtils';
import { getAuthenticatedUser } from './accountManagementBroker';

const DEFAULT_START_PAGE = 0;
const DEFAULT_PAGE_SIZE = 100;

const postThingUrl = 'https://test.beagily.basics.api.xilution.com/things';
const postSearchCriteriaUrl = 'https://test.beagily.basics.api.xilution.com/search-criterias';

const buildPutThingUrl = id => `https://test.beagily.basics.api.xilution.com/things/${id}`;

const buildGetOrDeleteThingUrl = (id, type) => `https://test.beagily.basics.api.xilution.com/things/${id}?type=${type}`;

const buildFetchThingsUrl = (searchCriteriaId, startPage, pageSize, type) => `https://test.beagily.basics.api.xilution.com/things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}&type=${type}`;

const buildPutTypesUrl = name => `https://test.beagily.basics.api.xilution.com/types/${name}`;

const getSearchCriteriaId = async (request, searchCriteria) => {
  const postSearchCriteriaResponse = await post(postSearchCriteriaUrl, searchCriteria, buildAuthorizedOptions(request));

  const { Location } = postSearchCriteriaResponse.headers;

  return Location.substring(Location.lastIndexOf('/') + 1);
};

export const postTodo = async (request) => {
  const user = await getAuthenticatedUser(request);

  const todo = {
    ...request.body,
    '@type': 'todo',
    owningUserId: user.id,
  };

  return post(postThingUrl, todo, buildAuthorizedOptions(request, user));
};

export const putTodo = async (request) => {
  const user = await getAuthenticatedUser(request);

  const todo = {
    ...request.body,
    '@type': 'todo',
    owningUserId: user.id,
  };

  return put(buildPutThingUrl(request.parameters.id), todo, buildAuthorizedOptions(request, user));
};

export const getTodo = async request => get(buildGetOrDeleteThingUrl(request.parameters.id, 'todo'), buildAuthorizedOptions(request));

export const deleteTodo = async request => del(buildGetOrDeleteThingUrl(request.parameters.id, 'todo'), buildAuthorizedOptions(request));

export const fetchTodos = async (request) => {
  const user = await getAuthenticatedUser(request);

  const searchCriteriaId = await getSearchCriteriaId(request, {
    '@type': 'fetch-todos-search-criteria',
    criteria: {},
    owningUserId: user.id,
  });

  return get(buildFetchThingsUrl(searchCriteriaId, DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE, 'todo'), buildAuthorizedOptions(request));
};

export const putType = async (request) => {
  const response = await put(buildPutTypesUrl(request.parameters.name), request.body, buildAuthorizedOptions(request));

  return response.data;
};

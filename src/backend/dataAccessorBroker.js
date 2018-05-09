import {get, put, delete as del} from 'axios';

import {buildAuthorizedOptions, buildAuthenticatedUserAwareOptions, buildTypeAwareOptions} from './brokerUtils';
import {getAuthenticatedUser} from './identityBroker';

const DEFAULT_START_PAGE = 0;
const DEFAULT_PAGE_SIZE = 100;

const putThingUrl = 'https://api.xilution.com/elements-data-accessor-beta/things';

const buildGetOrDeleteThingUrl = (id) => `https://api.xilution.com/elements-data-accessor-beta/things/${id}`;

const buildFetchThingsUrl = (searchCriteriaId, startPage, pageSize) =>
    `https://api.xilution.com/elements-data-accessor-beta/things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}`;

const buildPutTypesUrl = (name) => `https://api.xilution.com/elements-data-accessor-beta/types/${name}`;

const getSearchCriteriaId = async (request, user, searchCriteria) => {
    const putSearchCriteriaResponse = await put(putThingUrl, searchCriteria, buildAuthenticatedUserAwareOptions(request, user));

    const location = putSearchCriteriaResponse.headers.location;

    return location.substring(location.lastIndexOf('/') + 1);
};

export const putTodo = async (request) => {
    const user = await getAuthenticatedUser(request);

    const todo = {
        ...request.body,
        '@type': 'todo',
        owningUserId: user.id
    };

    return put(putThingUrl, todo, buildAuthenticatedUserAwareOptions(request, user));
};

export const getTodo = async (request) => {
    const user = await getAuthenticatedUser(request);

    return get(buildGetOrDeleteThingUrl(request.parameters.id), buildTypeAwareOptions(request, user, 'todo'));
};

export const deleteTodo = async (request) => {
    const user = await getAuthenticatedUser(request);

    return del(buildGetOrDeleteThingUrl(request.parameters.id), buildTypeAwareOptions(request, user, 'todo'));
};

export const fetchTodos = async (request) => {
    const user = await getAuthenticatedUser(request);

    const searchCriteriaId = await getSearchCriteriaId(request, user, {
        '@type': 'fetch-todos-search-criteria',
        owningUserId: user.id
    });

    return get(buildFetchThingsUrl(searchCriteriaId, DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE), buildTypeAwareOptions(request, user, 'todo'));
};

export const putType = async (request) => {
    const response = await put(buildPutTypesUrl(request.parameters.name), request.body, buildAuthorizedOptions(request));

    return response.data;
};

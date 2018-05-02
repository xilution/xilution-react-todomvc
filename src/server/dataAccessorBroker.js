const axios = require('axios');

const {buildAuthorizedOptions} = require('./brokerUtils');
const {getAuthenticatedUser} = require('./identityBroker');

const DEFAULT_START_PAGE = 0;
const DEFAULT_PAGE_SIZE = 100;

const putThingUrl = 'https://api.xilution.com/elements-data-accessor-beta/things';

const buildGetOrDeleteThingUrl = (id) => `https://api.xilution.com/elements-data-accessor-beta/things/${id}`;

const buildFetchThingsUrl = (searchCriteriaId, startPage, pageSize) =>
    `https://api.xilution.com/elements-data-accessor-beta/things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}`;

const buildPutTypesUrl = (name) => `https://api.xilution.com/elements-data-accessor-beta/types/${name}`;

const buildGetSearchCriteriaIdOptions = (request, criteria) => {
    const options = buildAuthorizedOptions(request);

    return {
        ...options,
        headers: {
            ...options.headers,
            'x-xilution-context-user-id': criteria.userId
        }
    };
};

const buildFetchTodosOptions = (request) => {
    const options = buildAuthorizedOptions(request);

    return {
        ...options,
        headers: {
            ...options.headers,
            'x-xilution-type': 'todo'
        }
    };
};

const getSearchCriteriaId = async (request, searchCriteriaType, criteria) => {
    const putSearchCriteriaResponse = await axios.put(putThingUrl, {
        ...criteria,
        '@type': searchCriteriaType
    }, buildGetSearchCriteriaIdOptions(request, criteria));

    const location = putSearchCriteriaResponse.headers.location;

    return location.substring(location.lastIndexOf('/') + 1);
};

const putTodo = async (request) => {
    const authenticatedUser = await getAuthenticatedUser(request);

    const todo = request.body.userId ? request.body : {
        '@type': 'todo',
        ...request.body,
        owningUserId: authenticatedUser.id,
        userId: authenticatedUser.id
    };

    return axios.put(putThingUrl, todo, buildAuthorizedOptions(request));
};

const getTodo = (request) => axios.get(buildGetOrDeleteThingUrl(request.id), buildAuthorizedOptions(request));

const deleteTodo = (request) => axios.delete(buildGetOrDeleteThingUrl(request.id), buildAuthorizedOptions(request));

const fetchTodos = async (request) => {
    const authenticatedUser = await getAuthenticatedUser(request);

    const searchCriteriaId = await getSearchCriteriaId(request, 'fetch-todos-search-criteria', {
        owningUserId: authenticatedUser.id,
        userId: authenticatedUser.id
    });

    return axios.get(buildFetchThingsUrl(searchCriteriaId, DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE), buildFetchTodosOptions(request));
};

const putType = async (request) => {
    const response = await axios.put(buildPutTypesUrl(request.parameters.name), request.body, buildAuthorizedOptions(request));

    return response.data;
};

module.exports = {
    deleteTodo,
    fetchTodos,
    getTodo,
    putTodo,
    putType
};

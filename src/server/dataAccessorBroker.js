const axios = require('axios');

const {buildAuthorizedOptions} = require('./brokerUtils');
const {getAuthenticatedUser} = require('./identityBroker');

const DEFAULT_START_PAGE = 0;
const DEFAULT_PAGE_SIZE = 100;

const clientBaseUrl = 'http://xilution-todomvc-website-bucket.s3-website-us-east-1.amazonaws.com';
const putThingUrl = 'https://api.xilution.com/elements-data-accessor-beta/things';

const buildGetOrDeleteThingUrl = (id) => `https://api.xilution.com/elements-data-accessor-beta/things/${id}`;

const buildFetchThingsUrl = (searchCriteriaId, startPage, pageSize) => `https://api.xilution.com/elements-data-accessor-beta/fetch-things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}`;

const buildPutTypesUrl = (name) => `https://api.xilution.com/elements-data-accessor-beta/types/${name}`;

const putTodo = async (request) => {
    const authenticatedUser = await getAuthenticatedUser(request);

    const todo = request.body.userId ? request.body : {
        ...request.body,
        userId: authenticatedUser.body.id
    };

    return axios.put(putThingUrl, todo, buildAuthorizedOptions(request));
};

const getTodo = (request) => axios.get(buildGetOrDeleteThingUrl(request.id), buildAuthorizedOptions(request));

const deleteTodo = (request) => axios.delete(buildGetOrDeleteThingUrl(request.id), buildAuthorizedOptions(request));

const getSearchCriteria = async (request, searchCriteriaType, criteria) => {
    const options = buildAuthorizedOptions(request);
    const response = await axios.put(putThingUrl, {
        ...criteria,
        '@type': searchCriteriaType
    }, {
        ...options,
        headers: {
            ...options.headers,
            'x-xilution-context-user-id': criteria.userId,
            'x-xilution-schema-url': `${clientBaseUrl}/schema/fetch-todos-search-criteria.json`,
            'x-xilution-type': searchCriteriaType
        }
    });

    return response.data;
};

const fetchTodos = async (request) => {
    console.log(JSON.stringify(request));

    const authenticatedUser = await getAuthenticatedUser(request);

    console.log(`authenticatedUser: ${JSON.stringify(authenticatedUser, null, 2)}`);

    const searchCriteria = await getSearchCriteria(request, 'fetch-todos-search-criteria', {
        owningUserId: authenticatedUser.id,
        userId: authenticatedUser.id
    });

    console.log(`searchCriteria: ${JSON.stringify(searchCriteria, null, 2)}`);

    return axios.get(buildFetchThingsUrl(searchCriteria.id, DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE), buildAuthorizedOptions(request));
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

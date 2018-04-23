const axios = require('axios');

const DEFAULT_START_PAGE = 0;
const DEFAULT_PAGE_SIZE = 100;

const buildCommonOptions = (request) => ({
    headers: {
        authentication: request.parameters.authentication,
        'x-api-key': process.env.XilutionApiKey
    }
});

const putThingUrl = 'https://api.xilution.com/elements-data-accessor-beta/thing?merge=true';
const getMeUrl = 'https://api.xilution.com/business-basics-identity-accessor-beta/me';

const buildGetOrDeleteThingUrl = (id) => `https://api.xilution.com/elements-data-accessor-beta/thing/${id}`;
const buildFetchThingsUrl = (searchCriteriaId, startPage, pageSize) => `https://api.xilution.com/elements-data-accessor-beta/fetch-things?search-criteria-id=${searchCriteriaId}&page-number=${startPage}&page-size=${pageSize}`;

const getAuthenticatedUser = (request) => axios.get(getMeUrl, buildCommonOptions(request)).body;

const putTodo = async (request) => {
    const authenticatedUser = await getAuthenticatedUser(request);
    const todo = request.body.userId ? request.body : {
        ...request.body,
        userId: authenticatedUser.id
    };

    return axios.put(putThingUrl, todo, buildCommonOptions(request));
};

const getTodo = (request) => axios.get(buildGetOrDeleteThingUrl(request.id), buildCommonOptions(request));

const deleteTodo = (request) => axios.delete(buildGetOrDeleteThingUrl(request.id), buildCommonOptions(request));

const fetchTodos = async (request) => {
    const authenticatedUser = await getAuthenticatedUser(request);
    const searchCriteria = await axios.put(putThingUrl, {
        '@type': 'fetch-todo-search-criteria',
        userId: authenticatedUser.id
    }, buildCommonOptions(request)).body;

    return axios.get(buildFetchThingsUrl(searchCriteria.id, DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE), buildCommonOptions(request));
};

module.exports = {
    deleteTodo,
    fetchTodos,
    getTodo,
    putTodo
};

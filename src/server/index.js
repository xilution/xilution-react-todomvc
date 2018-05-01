const {brokerRequest} = require('./requestAdapter');
const {registerUser, verifyUser, authenticate} = require('./identityBroker');
const {putTodo, getTodo, deleteTodo, fetchTodos} = require('./dataAccessorBroker');
const {
    registerUserRequestSchema,
    verifyUserRequestSchema,
    authenticateRequestSchema,
    putTodoRequestSchema,
    getTodoRequestSchema,
    deleteTodoRequestSchema,
    fetchTodosRequestSchema
} = require('./schemas');

const doRegisterUser = async (event, context, callback) => {
    const registerUserRequest = {body: JSON.parse(event.body)};
    const proxyResponse = await brokerRequest(registerUserRequest, registerUserRequestSchema, registerUser);

    return callback(null, proxyResponse);
};

const doVerifyUser = async (event, context, callback) => {
    const verifyUserRequest = {body: JSON.parse(event.body)};
    const proxyResponse = await brokerRequest(verifyUserRequest, verifyUserRequestSchema, verifyUser);

    return callback(null, proxyResponse);
};

const doAuthenticate = async (event, context, callback) => {
    const authenticateRequest = {body: JSON.parse(event.body)};
    const proxyResponse = await brokerRequest(authenticateRequest, authenticateRequestSchema, authenticate);

    return callback(null, proxyResponse);
};

const doPutTodo = async (event, context, callback) => {
    const putTodoRequest = {
        body: JSON.parse(event.body),
        parameters: {
            authorization: event.headers.Authorization
        }
    };
    const proxyResponse = await brokerRequest(putTodoRequest, putTodoRequestSchema, putTodo);

    return callback(null, proxyResponse);
};

const doGetTodo = async (event, context, callback) => {
    const getTodoRequest = {
        parameters: {
            authorization: event.headers.Authorization,
            id: event.pathParameters.id
        }
    };
    const proxyResponse = await brokerRequest(getTodoRequest, getTodoRequestSchema, getTodo);

    return callback(null, proxyResponse);
};

const doDeleteTodo = async (event, context, callback) => {
    const deleteTodoRequest = {
        parameters: {
            authorization: event.headers.Authorization,
            id: event.pathParameters.id
        }
    };
    const proxyResponse = await brokerRequest(deleteTodoRequest, deleteTodoRequestSchema, deleteTodo);

    return callback(null, proxyResponse);
};

const doFetchTodos = async (event, context, callback) => {
    //console.log(JSON.stringify(event, null, 2));

    const fetchTodosRequest = {
        parameters: {
            authorization: event.headers.Authorization
        }
    };
    const proxyResponse = await brokerRequest(fetchTodosRequest, fetchTodosRequestSchema, fetchTodos);

    return callback(null, proxyResponse);
};

module.exports = {
    doAuthenticate,
    doDeleteTodo,
    doFetchTodos,
    doGetTodo,
    doPutTodo,
    doRegisterUser,
    doVerifyUser
};

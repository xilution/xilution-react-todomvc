import {brokerRequest} from './requestAdapter';
import {authenticate} from './authenticationBroker';
import {putTodo, getTodo, deleteTodo, fetchTodos} from './beagilyBroker';
import {
    authenticateRequestSchema,
    putTodoRequestSchema,
    getTodoRequestSchema,
    deleteTodoRequestSchema,
    fetchTodosRequestSchema
} from './schemas';

export const doAuthenticate = async (event, context, callback) => {
    const authenticateRequest = {body: JSON.parse(event.body)};
    const proxyResponse = await brokerRequest(authenticateRequest, authenticateRequestSchema, authenticate);

    callback(null, proxyResponse);
};

export const doPutTodo = async (event, context, callback) => {
    const putTodoRequest = {
        body: JSON.parse(event.body),
        parameters: {
            authorization: event.headers.Authorization
        }
    };
    const proxyResponse = await brokerRequest(putTodoRequest, putTodoRequestSchema, putTodo);

    callback(null, proxyResponse);
};

export const doGetTodo = async (event, context, callback) => {
    const getTodoRequest = {
        parameters: {
            authorization: event.headers.Authorization,
            id: event.pathParameters.id
        }
    };
    const proxyResponse = await brokerRequest(getTodoRequest, getTodoRequestSchema, getTodo);

    callback(null, proxyResponse);
};

export const doDeleteTodo = async (event, context, callback) => {
    const deleteTodoRequest = {
        parameters: {
            authorization: event.headers.Authorization,
            id: event.pathParameters.id
        }
    };
    const proxyResponse = await brokerRequest(deleteTodoRequest, deleteTodoRequestSchema, deleteTodo);

    callback(null, proxyResponse);
};

export const doFetchTodos = async (event, context, callback) => {
    const fetchTodosRequest = {
        parameters: {
            authorization: event.headers.Authorization
        }
    };
    const proxyResponse = await brokerRequest(fetchTodosRequest, fetchTodosRequestSchema, fetchTodos);

    callback(null, proxyResponse);
};

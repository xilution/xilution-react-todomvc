import { brokerRequest } from './requestAdapter';
import { authenticate } from './authenticationBroker';
import {
  putTodo, postTodo, getTodo, deleteTodo, fetchTodos,
} from './beagilyBroker';
import {
  authenticateRequestSchema,
  postTodoRequestSchema,
  putTodoRequestSchema,
  getTodoRequestSchema,
  deleteTodoRequestSchema,
  fetchTodosRequestSchema,
} from './schemas';

export const doAuthenticate = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const authenticateRequest = { body: JSON.parse(event.body) };
  const proxyResponse = await brokerRequest(authenticateRequest, authenticateRequestSchema, authenticate);

  callback(null, proxyResponse);
};

export const doPostTodo = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const postTodoRequest = {
    body: JSON.parse(event.body),
    parameters: {
      authorization: event.headers.Authorization,
    },
  };
  const proxyResponse = await brokerRequest(postTodoRequest, postTodoRequestSchema, postTodo);

  callback(null, proxyResponse);
};

export const doPutTodo = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const putTodoRequest = {
    body: JSON.parse(event.body),
    parameters: {
      authorization: event.headers.Authorization,
      id: event.pathParameters.id,
    },
  };
  const proxyResponse = await brokerRequest(putTodoRequest, putTodoRequestSchema, putTodo);

  callback(null, proxyResponse);
};

export const doGetTodo = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const getTodoRequest = {
    parameters: {
      authorization: event.headers.Authorization,
      id: event.pathParameters.id,
    },
  };
  const proxyResponse = await brokerRequest(getTodoRequest, getTodoRequestSchema, getTodo);

  callback(null, proxyResponse);
};

export const doDeleteTodo = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const deleteTodoRequest = {
    parameters: {
      authorization: event.headers.Authorization,
      id: event.pathParameters.id,
    },
  };
  const proxyResponse = await brokerRequest(deleteTodoRequest, deleteTodoRequestSchema, deleteTodo);

  callback(null, proxyResponse);
};

export const doFetchTodos = async (event, context, callback) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  const fetchTodosRequest = {
    parameters: {
      authorization: event.headers.Authorization,
    },
  };
  const proxyResponse = await brokerRequest(fetchTodosRequest, fetchTodosRequestSchema, fetchTodos);

  callback(null, proxyResponse);
};

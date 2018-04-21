const identityBroker = require('./identityBroker');
const dataAccessorBroker = require('./dataAccessorBroker');

const registerUser = async (event, context, callback) => {
    const response = await identityBroker.registerUser(event.body);

    return callback(null, response);
};

const verifyUser = async (event, context, callback) => {
    const response = await identityBroker.verifyUser(event.body);

    return callback(null, response);
};

const authenticate = async (event, context, callback) => {
    console.log(`event: ${JSON.stringify(event, null, 2)}`);
    console.log(`context: ${JSON.stringify(context, null, 2)}`);

    const body = JSON.parse(event.body);
    const response = await identityBroker.authenticate({
        password: body.password,
        username: body.username
    });

    return callback(null, response);
};

const putToDo = async (event, context, callback) => {
    const response = await dataAccessorBroker.putToDo(event.body);

    return callback(null, response);
};

const getToDo = async (event, context, callback) => {
    const response = await dataAccessorBroker.getToDo(event.body);

    return callback(null, response);
};

const deleteToDo = async (event, context, callback) => {
    const response = await dataAccessorBroker.deleteToDo(event.body);

    return callback(null, response);
};

const fetchToDos = async (event, context, callback) => {
    const response = await dataAccessorBroker.fetchToDos(event.body);

    return callback(null, response);
};

module.exports = {
    authenticate,
    deleteToDo,
    fetchToDos,
    getToDo,
    putToDo,
    registerUser,
    verifyUser
};

const {register, verifyRegistration, authenticate} = require('./identityBroker');
const {putToDo, getToDo, deleteToDo, fetchToDos} = require('./dataAccessorBroker');

// eslint-disable-next-line complexity

// FIXME - this is completely wrong. Needs to have a function per endpoint see template-sam.yml
const handler = async (event, context, callback) => {
    const operation = event.operation;

    if (operation === 'REGISTER') {
        const response = await register(event.body);

        return callback(null, response);
    } else if (operation === 'VERIFY_REGISTRATION') {
        const response = await verifyRegistration(event.body);

        return callback(null, response);
    } else if (operation === 'AUTHENTICATE') {
        const response = await authenticate(event.body);

        return callback(null, response);
    } else if (operation === 'PUT_TODO') {
        const response = await putToDo(event.body);

        return callback(null, response);
    } else if (operation === 'GET_TODO') {
        const response = await getToDo(event.body);

        return callback(null, response);
    } else if (operation === 'DELETE_TODO') {
        const response = await deleteToDo(event.body);

        return callback(null, response);
    } else if (operation === 'FETCH_TODOS') {
        const response = await fetchToDos(event.body);

        return callback(null, response);
    }

    return callback(new Error(`[BAD REQUEST] Unknown operation: ${operation}`));
};

module.exports = {handler};

const {register, verifyRegistration, authenticate} = require('./identityBroker');
const {putToDo, getToDo, deleteToDo, fetchToDos} = require('./dataAccessorBroker');

export const handler = (event) => {
    const operation = event.operation;

    switch (operation) {
        case 'REGISTER':
            return register(event.body);
        case 'VERIFY_REGISTRATION':
            return verifyRegistration(event.body);
        case 'AUTHENTICATE':
            return authenticate(event.body);
        case 'PUT_TODO':
            return putToDo(event.body);
        case 'GET_TODO':
            return getToDo(event.body);
        case 'DELETE_TODO':
            return deleteToDo(event.body);
        case 'FETCH_TODOS':
            return fetchToDos(event.body);
        default:
            return `[BAD REQUEST] Unknown operation: ${operation}`;
    }
};

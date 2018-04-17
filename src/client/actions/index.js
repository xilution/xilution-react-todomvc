let nextTodoId = 0;

export const addTodo = (text) => ({
    id: nextTodoId++,
    text,
    type: 'ADD_TODO'
});

export const setVisibilityFilter = (filter) => ({
    filter,
    type: 'SET_VISIBILITY_FILTER'
});

export const toggleTodo = (id) => ({
    id,
    type: 'TOGGLE_TODO'
});

export const authenticationSuccess = (idToken) => ({
    idToken,
    type: 'LOG_IN_SUCCESS'
});

export const registerSuccess = (token) => ({
    token,
    type: 'REGISTER_SUCCESS'
});

export const verifyRegistrationSuccess = (idToken) => ({
    idToken,
    type: 'VERIFY_REGISTRATION_SUCCESS'
});

export const VisibilityFilters = {
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
};

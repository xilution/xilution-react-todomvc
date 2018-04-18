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
    type: 'AUTHENTICATION_SUCCESS'
});

export const registerSuccess = (registrationToken) => ({
    registrationToken,
    type: 'REGISTER_SUCCESS'
});

export const signOut = () => ({
    type: 'SIGN_OUT'
});

export const VisibilityFilters = {
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
};

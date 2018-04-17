const auth = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                idToken: action.idToken
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                registrationToken: action.registrationToken
            };
        case 'VERIFY_REGISTRATION_SUCCESS':
            return {
                ...state,
                idToken: action.idToken
            };
        default:
            return state;
    }
};

export default auth;

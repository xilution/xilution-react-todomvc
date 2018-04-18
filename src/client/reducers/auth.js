const auth = (state = {}, action) => {
    switch (action.type) {
        case 'AUTHENTICATION_SUCCESS':
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
        case 'SIGN_OUT':
            return {
                ...state,
                idToken: undefined
            };
        default:
            return state;
    }
};

export default auth;

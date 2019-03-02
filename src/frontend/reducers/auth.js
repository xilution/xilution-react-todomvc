// eslint-disable-next-line complexity
const auth = (state = {}, action) => {
    switch (action.type) {
        case 'AUTHENTICATION_SUCCESS':
            return {
                ...state,
                accessToken: action.accessToken
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                userRegistrationToken: action.userRegistrationToken
            };
        case 'VERIFY_REGISTRATION_SUCCESS':
            return {
                ...state,
                accessToken: action.accessToken
            };
        case 'SIGN_OUT':
            return {};
        default:
            return state;
    }
};

export default auth;

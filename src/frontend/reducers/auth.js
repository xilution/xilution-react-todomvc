const auth = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default auth;

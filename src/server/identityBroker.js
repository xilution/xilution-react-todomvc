const axios = require('axios');

const doRegister = async ({firstName, lastName, email, username, password}) => {
    const response = await axios.post('https://api.xilution.com/elements-identity-beta/register-user', {
        email,
        firstName,
        lastName,
        password,
        username
    });

    return response.data;
};

const doVerifyRegistration = async ({verificationCode}) => {
    const response = await axios.post('https://api.xilution.com/elements-identity-beta/verify-registration', {
        verificationCode
    });

    return response.data;
};

const doAuthenticate = async ({username, password}) => {
    const response = await axios.post('https://api.xilution.com/elements-identity-beta/authenticate', {
        password,
        username
    });

    return response.data;
};

module.exports = {
    authenticate: doAuthenticate,
    register: doRegister,
    verifyRegistration: doVerifyRegistration
};

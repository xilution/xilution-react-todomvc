const axios = require('axios');

const commonOptions = {
    headers: {
        'x-api-key': process.env.XilutionApiKey
    }
};
const registerUserUrl = 'https://api.xilution.com/business-basics-identity-beta/register-user';
const verifyUserUrl = 'https://api.xilution.com/business-basics-identity-beta/confirm-user-registration';
const authenticateUrl = 'https://api.xilution.com/business-basics-identity-beta/authenticate';

const registerUser = (request) => axios.post(registerUserUrl, request.body, commonOptions);

const verifyUser = (request) => axios.post(verifyUserUrl, request.body, commonOptions);

const authenticate = (request) => axios.post(authenticateUrl, request.body, commonOptions);

module.exports = {
    authenticate,
    registerUser,
    verifyUser
};

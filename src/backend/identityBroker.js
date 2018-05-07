const axios = require('axios');

const {buildAuthorizedOptions, buildCommonOptions} = require('./brokerUtils');

const registerUserUrl = 'https://api.xilution.com/business-basics-identity-beta/register-user';
const verifyUserUrl = 'https://api.xilution.com/business-basics-identity-beta/confirm-user-registration';
const authenticateUrl = 'https://api.xilution.com/business-basics-identity-beta/authenticate';
const getMeUrl = 'https://api.xilution.com/business-basics-identity-beta/me';

const registerUser = (request) => axios.post(registerUserUrl, {
    ...request.body,
    organizationId: process.env.XilutionSubscriberOrgId
}, buildCommonOptions());

const verifyUser = (request) => axios.post(verifyUserUrl, {
    ...request.body,
    productSelections: [
        'xilution-elements-data-accessor',
        'xilution-business-basics-identity'
    ]
}, buildCommonOptions());

const authenticate = (request) => axios.post(authenticateUrl, request.body, buildCommonOptions());

const getAuthenticatedUser = async (request) => {
    const response = await axios.get(getMeUrl, buildAuthorizedOptions(request));

    return response.data;
};

module.exports = {
    authenticate,
    getAuthenticatedUser,
    registerUser,
    verifyUser
};

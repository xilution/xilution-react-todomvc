import {get, post} from 'axios';

import {buildAuthorizedOptions, buildCommonOptions} from './brokerUtils';

const registerUserUrl = 'https://api.xilution.com/business-basics-identity-beta/register-user';
const verifyUserUrl = 'https://api.xilution.com/business-basics-identity-beta/confirm-user-registration';
const authenticateUrl = 'https://api.xilution.com/business-basics-identity-beta/authenticate';
const getMeUrl = 'https://api.xilution.com/business-basics-identity-beta/me';

export const registerUser = (request) => post(registerUserUrl, {
    ...request.body,
    organizationId: process.env.XilutionSubscriberOrgId
}, buildCommonOptions());

export const verifyUser = (request) => post(verifyUserUrl, {
    ...request.body,
    productSelections: [
        'xilution-elements-data-accessor',
        'xilution-business-basics-identity'
    ]
}, buildCommonOptions());

export const authenticate = (request) => post(authenticateUrl, request.body, buildCommonOptions());

export const getAuthenticatedUser = async (request) => {
    const response = await get(getMeUrl, buildAuthorizedOptions(request));

    return response.data;
};

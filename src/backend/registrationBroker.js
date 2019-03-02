import {post} from 'axios';

import {buildCommonOptions} from './brokerUtils';

const registerUserUrl = 'https://test.registration.core.api.xilution.com/register-user';
const verifyUserUrl = 'https://test.registration.core.api.xilution.com/confirm-user-registration';

export const registerUser = (request) => post(registerUserUrl, {
    ...request.body,
    organizationId: process.env.XilutionSubscriberOrgId
}, buildCommonOptions());

export const verifyUser = (request) => post(verifyUserUrl, {
    ...request.body,
    productSelections: [
        '58c8ae6b6a794b38adcdfcd1c2848e13'
    ]
}, buildCommonOptions());

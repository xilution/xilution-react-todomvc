import {post} from 'axios';

import {buildCommonOptions} from './brokerUtils';

const authenticateUrl = 'https://test.authentication.core.api.xilution.com/oauth/token';

const CLIENT_ID = 'replace-with-your-client-id';

export const authenticate = (request) => post(authenticateUrl, {
    ...request.body,
    'client_id': CLIENT_ID,
    'grant_type': 'password',
    'scope': 'read write'
}, buildCommonOptions());

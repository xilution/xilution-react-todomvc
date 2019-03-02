import {post} from 'axios';

import {buildCommonOptions} from './brokerUtils';

const authenticateUrl = 'https://test.authentication.core.api.xilution.com/oauth/token';

export const authenticate = (request) => post(authenticateUrl, request.body, buildCommonOptions());

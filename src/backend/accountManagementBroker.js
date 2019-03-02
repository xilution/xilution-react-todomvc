import {get} from 'axios';

import {buildAuthorizedOptions} from './brokerUtils';

const getMeUrl = 'https://test.account-management.core.api.xilution.com/me';

export const getAuthenticatedUser = async (request) => {
    const response = await get(getMeUrl, buildAuthorizedOptions(request));

    return response.data;
};

import { get } from 'axios';

import { buildAuthorizedOptions } from './brokerUtils';

const getMeUrl = 'https://test.account-management.core.api.xilution.com/me';

// eslint-disable-next-line import/prefer-default-export
export const getAuthenticatedUser = async (request) => {
  const response = await get(getMeUrl, buildAuthorizedOptions(request));

  return response.data;
};

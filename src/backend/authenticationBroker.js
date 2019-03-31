import { post } from 'axios';

const authenticateUrl = 'https://test.authentication.core.api.xilution.com/oauth/token';

// eslint-disable-next-line import/prefer-default-export
export const authenticate = request => post(authenticateUrl, {
  ...request.body,
  client_id: process.env.XilutionClientId,
  grant_type: 'password',
  scope: 'read write',
});

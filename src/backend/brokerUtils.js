// eslint-disable-next-line import/prefer-default-export
export const buildAuthorizedOptions = request => ({
  headers: {
    Authorization: `Bearer ${request.parameters.authorization}`,
  },
});

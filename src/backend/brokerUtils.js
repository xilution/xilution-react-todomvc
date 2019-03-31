export const buildAuthorizedOptions = request => ({
  headers: {
    Authorization: request.parameters.authorization,
  },
});

export const buildTypeAwareOptions = (request, authenticatedUser, type) => {
  const options = buildAuthorizedOptions(request, authenticatedUser);

  return {
    ...options,
    headers: {
      ...options.headers,
      'x-xilution-type': type,
    },
  };
};

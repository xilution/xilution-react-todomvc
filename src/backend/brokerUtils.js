const commonOptions = {
    headers: {
        'x-api-key': process.env.XILUTION_SUBSCRIBER_API_KEY
    }
};

const buildAuthorizedOptions = (request) => ({
    headers: {
        ...commonOptions.headers,
        Authorization: request.parameters.authorization
    }
});

const buildContextUserAwareOptions = (request, authenticatedUser) => {
    const options = buildAuthorizedOptions(request);

    return {
        ...options,
        headers: {
            ...options.headers,
            'x-xilution-context-user-id': authenticatedUser.id
        }
    };
};

const buildTypeAwareOptions = (request, authenticatedUser, type) => {
    const options = buildContextUserAwareOptions(request, authenticatedUser);

    return {
        ...options,
        headers: {
            ...options.headers,
            'x-xilution-type': type
        }
    };
};

module.exports = {
    buildAuthorizedOptions,
    buildContextUserAwareOptions,
    buildTypeAwareOptions,
    commonOptions
};

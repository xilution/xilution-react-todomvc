const commonOptions = {
    headers: {
        'x-api-key': process.env.XilutionApiKey
    }
};

const buildAuthorizedOptions = (request) => ({
    headers: {
        ...commonOptions.headers,
        Authorization: request.parameters.authorization
    }
});

module.exports = {
    buildAuthorizedOptions,
    commonOptions
};

const uuid = require('uuid');

const commonProperties = {
    isBase64Encoded: false
};

const commonHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};

const buildErrorProxyResponse = (context, error) => {
    const errorId = uuid.v4();

    // eslint-disable-next-line no-console
    console.log(JSON.stringify({
        context,
        error: error.message,
        errorId
    }));

    return {
        ...commonProperties,
        body: JSON.stringify({
            errorId,
            message: 'Internal Server Error'
        }),
        headers: commonHeaders,
        statusCode: 500
    };
};

const buildInputValidationProxyResponse = (inputValidationResult) => ({
    ...commonProperties,
    body: JSON.stringify(inputValidationResult.error),
    headers: commonHeaders,
    statusCode: 400
});

const buildSuccessProxyResponse = (response) => ({
    ...commonProperties,
    body: response.data ? JSON.stringify(response.data) : '',
    headers: {
        ...commonHeaders,
        location: response.headers.location
    },
    statusCode: response.status
});

module.exports = {
    buildErrorProxyResponse,
    buildInputValidationProxyResponse,
    buildSuccessProxyResponse
};

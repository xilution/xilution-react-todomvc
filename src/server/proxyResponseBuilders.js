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
        body: JSON.stringify({errorId}),
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
    body: JSON.stringify(response.data),
    headers: commonHeaders,
    statusCode: 200
});

module.exports = {
    buildErrorProxyResponse,
    buildInputValidationProxyResponse,
    buildSuccessProxyResponse
};

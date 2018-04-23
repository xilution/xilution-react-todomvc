const Joi = require('joi');

const {
    buildInputValidationProxyResponse,
    buildSuccessProxyResponse,
    buildErrorProxyResponse
} = require('./proxyResponseBuilders');

const brokerRequest = async (request, schema, func) => {
    const inputValidationResult = Joi.validate(request, schema);

    if (inputValidationResult.error) {
        return buildInputValidationProxyResponse(inputValidationResult);
    }

    try {
        const response = await func(request);

        return buildSuccessProxyResponse(response);
    } catch (error) {
        return buildErrorProxyResponse({
            ...request,
            action: func.toString
        }, error);
    }
};

module.exports = {
    brokerRequest
};

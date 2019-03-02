import { v4 } from 'uuid';

const commonProperties = {
  isBase64Encoded: false,
};

const commonHeaders = {
  'access-control-allow-origin': '*',
  'content-type': 'application/json',
};

export const buildErrorProxyResponse = (context, error) => {
  const errorId = v4();

  // eslint-disable-next-line no-console
  console.log(JSON.stringify({
    context,
    error: error.message,
    errorId,
  }));

  return {
    ...commonProperties,
    body: JSON.stringify({
      errorId,
      message: 'Internal Server Error',
    }),
    headers: commonHeaders,
    statusCode: 500,
  };
};

export const buildInputValidationProxyResponse = inputValidationResult => ({
  ...commonProperties,
  body: JSON.stringify(inputValidationResult.error),
  headers: commonHeaders,
  statusCode: 400,
});

export const buildSuccessProxyResponse = response => ({
  ...commonProperties,
  body: response.data ? JSON.stringify(response.data) : '',
  headers: {
    ...commonHeaders,
    'access-control-expose-headers': 'location',
    location: response.headers.location,
  },
  statusCode: response.status,
});

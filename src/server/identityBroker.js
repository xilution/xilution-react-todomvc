const axios = require('axios');

const registerUser = async ({firstName, lastName, email, username, password}) => {
    const response = await axios.post('https://api.xilution.com/business-basics-identity-beta/register-user', {
        email,
        firstName,
        lastName,
        password,
        username
    });

    return response.data;
};

const verifyUser = async ({verificationCode}) => {
    const response = await axios.post('https://api.xilution.com/business-basics-identity-beta/verify-registration', {
        verificationCode
    });

    return response.data;
};

const authenticate = async ({username, password}) => {
    try {
        const response = await axios.post('https://api.xilution.com/business-basics-identity-beta/authenticate', {
            password,
            username
        }, {
            headers: {
                'x-api-key': process.env.XilutionApiKey
            }
        });

        return {
            body: JSON.stringify(response.data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false,
            statusCode: 200
        };

    } catch (error) {
        return {
            body: JSON.stringify({
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false,
            statusCode: 500
        };
    }
};

module.exports = {
    authenticate,
    registerUser,
    verifyUser
};

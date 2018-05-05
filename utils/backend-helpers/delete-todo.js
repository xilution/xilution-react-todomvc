const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/backend/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);
const doDeleteTodo = promisify(index.doDeleteTodo);

const run = async () => {
    if (!process.env.XILUTION_SUBSCRIBER_API_KEY) {
        throw new Error('XILUTION_SUBSCRIBER_API_KEY environment variable must be set.');
    }

    prompt.start();

    const input = await promptGetAsync({
        properties: {
            username: {
                required: true
            },
            // eslint-disable-next-line sort-keys
            password: {
                hidden: true,
                required: true
            },
            // eslint-disable-next-line sort-keys
            id: {
                required: true
            }
        }
    });

    const authenticationResponse = await doAuthenticateAsync({
        body: JSON.stringify({
            password: input.password,
            username: input.username
        })
    }, {});

    const IdToken = JSON.parse(authenticationResponse.body).IdToken;

    return doDeleteTodo({
        headers: {
            Authorization: IdToken
        },
        pathParameters: {
            id: input.id
        }
    }, {});
};

// eslint-disable-next-line no-console
run().then((response) => console.log(`Response: ${JSON.stringify(response, null, 2)}`)).catch((error) => console.error(error));

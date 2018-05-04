const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/server/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);
const doGetTodo = promisify(index.doGetTodo);

const run = async () => {
    if (!process.env.XilutionApiKey) {
        throw new Error('XilutionApiKey environment variable must be set.');
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

    return doGetTodo({
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

const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/server/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);
const doFetchTodosAsync = promisify(index.doFetchTodos);

const run = async () => {
    if (!process.env.XilutionApiKey) {
        throw new Error('XilutionApiKey environment variable must be set.');
    }

    prompt.start();

    const credentials = await promptGetAsync({
        properties: {
            username: {
                required: true
            },
            // eslint-disable-next-line sort-keys
            password: {
                hidden: true,
                required: true
            }
        }
    });

    const authenticationResponse = await doAuthenticateAsync({
        body: JSON.stringify(credentials)
    }, {});

    const IdToken = JSON.parse(authenticationResponse.body).IdToken;

    return doFetchTodosAsync({
        headers: {
            Authorization: IdToken
        }
    }, {});
};

// eslint-disable-next-line no-console
run().then((response) => console.log(JSON.stringify(response, null, 2))).catch((error) => console.error(error));

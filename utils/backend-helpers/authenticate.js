const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/backend/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);

const run = async () => {
    if (!process.env.XILUTION_SUBSCRIBER_API_KEY) {
        throw new Error('XILUTION_SUBSCRIBER_API_KEY environment variable must be set.');
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

    return doAuthenticateAsync({
        body: JSON.stringify(credentials)
    }, {});
};

// eslint-disable-next-line no-console
run().then((response) => console.log(`Response: ${JSON.stringify(response, null, 2)}`)).catch((error) => console.error(error));

const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/server/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);

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

    return doAuthenticateAsync({
        body: JSON.stringify(credentials)
    }, {});
};

// eslint-disable-next-line no-console
run().then((response) => console.log(JSON.stringify(response, null, 2))).catch((error) => console.error(error));

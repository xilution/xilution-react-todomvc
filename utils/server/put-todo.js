const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/server/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);
const doPutTodo = promisify(index.doPutTodo);

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
            text: {
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

    return doPutTodo({
        body: JSON.stringify({
            completed: false,
            text: input.text
        }),
        headers: {
            Authorization: IdToken
        }
    }, {});
};

// eslint-disable-next-line no-console
run().then((response) => console.log(JSON.stringify(response, null, 2))).catch((error) => console.error(error));

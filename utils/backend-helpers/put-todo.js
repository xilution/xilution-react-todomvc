const {promisify} = require('util');

const prompt = require('prompt');

const index = require('../../src/backend/index');

const promptGetAsync = promisify(prompt.get);
const doAuthenticateAsync = promisify(index.doAuthenticate);
const doPutTodo = promisify(index.doPutTodo);

const run = async () => {
    if (!process.env.XilutionSubscriberApiKey) {
        throw new Error('XilutionSubscriberApiKey environment variable must be set.');
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
                required: false
            },
            text: {
                required: true
            },
            // eslint-disable-next-line sort-keys
            completed: {
                required: false,
                type: 'boolean'
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

    const todo = {
        text: input.text
    };

    if (input.id) {
        todo.id = input.id;
    }

    if (input.completed) {
        todo.completed = input.completed;
    } else {
        todo.completed = false;
    }

    // eslint-disable-next-line no-console
    console.log(`Putting: ${JSON.stringify(todo, null, 2)}`);

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
run().then((response) => console.log(`Response: ${JSON.stringify(response, null, 2)}`)).catch((error) => console.error(error));

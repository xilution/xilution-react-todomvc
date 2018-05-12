require('babel-polyfill');

const {promisify} = require('util');

const AWS = require('aws-sdk');
const prompt = require('prompt');

const identityBroker = require('../../temp/src/backend/identityBroker');
const dataAccessorBroker = require('../../temp/src/backend/dataAccessorBroker');

const secretsmanager = new AWS.SecretsManager({
    region: 'us-east-1'
});

const secretsmanagerGetSecretValueAsync = promisify(secretsmanager.getSecretValue.bind(secretsmanager));
const promptGetAsync = promisify(prompt.get);

const types = [
    {
        name: 'todo',
        schema: require('./schema/todo.json')
    },
    {
        name: 'fetch-todos-search-criteria',
        schema: require('./schema/fetch-todos-search-criteria.json')
    }
];

const putType = async (IdToken, type) => {
    await dataAccessorBroker.putType({
        body: type.schema,
        parameters: {
            authorization: IdToken,
            name: type.name
        }
    });
    // eslint-disable-next-line no-console
    console.log(`Done putting type: ${type.name}`);
};

const run = async () => {
    const secretsmanagerResponse = await secretsmanagerGetSecretValueAsync({
        SecretId: 'XilutionSubscriberApiKey'
    });

    process.env.XilutionSubscriberApiKey = secretsmanagerResponse.SecretString;

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

    const {data: {IdToken}} = await identityBroker.authenticate({
        body: credentials
    });

    // eslint-disable-next-line no-console
    console.log('Authentication success! Putting types now...');

    await Promise.all(types.map((type) => putType(IdToken, type)));
};

// eslint-disable-next-line no-console
run().then(() => console.log('All Done!')).catch((error) => console.error(error));

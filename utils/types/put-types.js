require('@babel/polyfill');

const { promisify } = require('util');

// eslint-disable-next-line import/no-extraneous-dependencies
const prompt = require('prompt');

const authenticationBroker = require('../../temp/src/backend/authenticationBroker');
const beagilyBroker = require('../../temp/src/backend/beagilyBroker');

const promptGetAsync = promisify(prompt.get);

const todoSchema = require('./schema/todo.json');
const fetchTodosSearchCriteriaSchema = require('./schema/fetch-todos-search-criteria.json');

const types = [
  {
    name: 'todo',
    schema: todoSchema,
  },
  {
    name: 'fetch-todos-search-criteria',
    schema: fetchTodosSearchCriteriaSchema,
  },
];

const putType = async (accessToken, type) => {
  await beagilyBroker.putType({
    body: type.schema,
    parameters: {
      authorization: accessToken,
      name: type.name,
    },
  });
  // eslint-disable-next-line no-console
  console.log(`Done putting type: ${type.name}`);
};

const run = async () => {
  prompt.start();

  const credentials = await promptGetAsync({
    properties: {
      username: {
        required: true,
      },
      // eslint-disable-next-line sort-keys
      password: {
        hidden: true,
        required: true,
      },
    },
  });

  // eslint-disable-next-line camelcase
  const { data: { access_token } } = await authenticationBroker.authenticate({
    body: credentials,
  });

  // eslint-disable-next-line no-console
  console.log('Authentication success! Putting types now...');

  await Promise.all(types.map(type => putType(access_token, type)));
};

// eslint-disable-next-line no-console
run().then(() => console.log('All Done!')).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});

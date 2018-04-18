/* eslint-disable no-console */
const minimist = require('minimist');

const {handler} = require('../dist/server/index');

const argv = minimist(process.argv.slice(2));
const operation = argv.o;

if (!operation) {
    console.log('Usage: node .utils/bootstrap-server -o {some-operation}');
} else {
    handler({
        operation
    }, {}, (error, response) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log(JSON.stringify(response, null, 2));
        }
    });
}
/* eslint-enable no-console */

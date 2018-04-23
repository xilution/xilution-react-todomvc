const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', './src/server/index.js'],
    externals: [nodeExternals({
        whitelist: [
            'axios',
            'babel-polyfill',
            'core-js/fn/regexp/escape',
            'core-js/shim',
            'debug',
            'follow-redirects',
            'has-flag',
            'hoek',
            'isemail',
            'is-buffer',
            'joi',
            'ms',
            'os',
            'regenerator-runtime/runtime',
            'stream',
            'supports-color',
            'topo',
            'tty',
            'url',
            'util',
            'uuid'
        ]
    })],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist/server')
    },
    target: 'node'
};

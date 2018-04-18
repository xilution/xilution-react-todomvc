const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', './src/server/index.js'],
    externals: [nodeExternals({
        whitelist: ['axios']
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

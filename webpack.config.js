const path = require('path');
const webpack = require('webpack');

const common = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    stats: {
        colors: true
    },
    mode: 'development'
}

const client = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'build/web/js'),
        filename: 'main.bundle.js'
    },
    devtool: 'source-map'
}

module.exports = [
    Object.assign({}, common, client)
];
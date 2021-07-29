const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    target: 'node',
    entry: path.resolve(__dirname, '../server/app.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server.runtime.js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: [nodeExternals()],
    devtool: 'eval-cheap-source-map'
}

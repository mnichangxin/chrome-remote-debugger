const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: 'server.runtime.min.js'
    },
    devtool: false
})

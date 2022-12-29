const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const spawn = require('child_process').spawn

const baseConfig = require('./webpack.renderer.explorer.config')

module.exports = merge.smart(baseConfig, {
    entry: [
        'react-hot-loader/patch',
        './src/renderer/explorer-app.tsx'
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [ path.resolve(__dirname, 'src', 'renderer') ],
                loaders: ['react-hot-loader/webpack', 'ts-loader']
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 2003,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting main process');
                spawn('npm', ['run', 'start-main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                    .on('close', code => process.exit(code))
                    .on('error', spawnError => console.error(spawnError));
            }
        }
    }
})

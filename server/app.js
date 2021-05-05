import path from 'path'
import http from 'http'
import Koa from 'koa'
import Logger from 'koa-logger'
import IO from 'socket.io'
import StaticFile from './middlewares/staticFile'
import Controller from './middlewares/controller'
import CDP from './cdp'

const createApp = (port = 8080) => {
    const app = new Koa()
    const logger = new Logger()
    const controller = new Controller()

    app.use(logger)
    app.use(controller)
    app.use(
        StaticFile(
            path.resolve(
                __dirname,
                '../node_modules/chrome-devtools-frontend/front_end'
            ),
            '/app'
        )
    )
    app.use(StaticFile(path.resolve(__dirname, '../test'), '/test'))

    const server = http.createServer(app.callback())
    const ioServer = IO(server, {
        cors: {
            origin: '*'
        }
    })
    const cdp = new CDP(ioServer)

    ioServer.on('connection', socket => {
        socket.on('log', args => {
            console.log(args)
        })
    })
    server.on('upgrade', cdp.upgradeWssSocket)

    server.listen(port)

    console.log(`Server start at port: ${port}...`)
}

createApp()

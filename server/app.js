import path from 'path'
import http from 'http'
import Koa from 'koa'
import KoaBodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import IO from 'socket.io'
// import opener from 'opener'
import StaticFile from './middlewares/staticFile'
import Controller from './middlewares/controller'
import SocketManage from './service/SocketManage'

const createApp = (port = 9222) => {
    const app = new Koa()
    const koaBodyParser = new KoaBodyParser()
    const logger = new Logger()
    const controller = new Controller()

    app.use(koaBodyParser)
    app.use(logger)
    app.use(controller)
    app.use(
        StaticFile(
            path.resolve(
                __dirname,
                '../node_modules/chrome-devtools-frontend/front_end'
            ),
            '/devtools'
        )
    )
    app.use(StaticFile(path.resolve(__dirname, '../view'), '/view'))
    app.use(StaticFile(path.resolve(__dirname, '../test'), '/test'))
    app.use(StaticFile(path.resolve(__dirname, '../dist'), '/dist'))

    const server = http.createServer(app.callback())
    const ioServer = IO(server, {
        cors: {
            origin: '*'
        }
    })
    const cdp = SocketManage.getInstance(ioServer)

    server.on('upgrade', cdp.upgradeWssSocket.bind(cdp))

    server.listen(port)

    // opener(`http://localhost:${port}/view/home.html`)

    console.log(`server start at port: ${port}...`)
}

createApp()

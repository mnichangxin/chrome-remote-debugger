import path from 'path'
import http from 'http'
import Koa from 'koa'
import KoaBodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import IO from 'socket.io'
import StaticFile from './middlewares/staticFile'
import Controller from './middlewares/controller'
import SocketManage from './service/SocketManage'
export default class ServerApp {
    constructor(options) {
        this.port = options.port
        this.app = null
        this.server = null
        this.socketServer = null
    }
    addMiddlewares() {
        const koaBodyParser = new KoaBodyParser()
        const logger = new Logger()
        const controller = new Controller()
        const app = this.app

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
    }
    listen() {
        const cdp = SocketManage.getInstance(this.socketServer)
        this.server.on('upgrade', cdp.upgradeWssSocket.bind(cdp))
        this.server.listen(this.port)
    }
    createSocketServer() {
        this.socketServer = IO(this.server, { cors: { origin: '*' } })
    }
    createServer() {
        this.app = new Koa()
        this.addMiddlewares()
        this.server = http.createServer(this.app.callback())
    }
    start() {
        if (!this.app) {
            this.createServer()
            this.createSocketServer()
            this.listen()
            console.log(`server start at port: ${this.port}...`)
        }
    }
}

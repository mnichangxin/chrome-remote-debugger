import os from 'os'
import path from 'path'
import http from 'http'
import Koa from 'koa'
import KoaBodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import IO from 'socket.io'
import opener from 'opener'
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
    addGlobal() {
        this.app.context.serverHost = this.getAddress()
        this.app.context.serverPort = this.getPort()
    }
    listen() {
        const cdp = SocketManage.getInstance(this.socketServer)
        this.server.on('upgrade', cdp.upgradeWssSocket.bind(cdp))
        this.server.listen(this.port)
    }
    createSocketServer() {
        this.socketServer = IO(this.server, {
            cors: { origin: '*' }
        })
    }
    createServer() {
        this.app = new Koa()
        this.addMiddlewares()
        this.addGlobal()
        this.server = http.createServer(this.app.callback())
    }
    getAddress() {
        const ifaces = os.networkInterfaces()
        const keys = Object.keys(ifaces)
        for (let i = 0; i < keys.length; i++) {
            const dev = ifaces[keys[i]]
            for (let j = 0; j < dev.length; j++) {
                const netInfo = dev[j]
                if (
                    netInfo.family === 'IPv4' &&
                    netInfo.address !== '0.0.0.0' &&
                    netInfo.address !== '127.0.0.1'
                ) {
                    return netInfo.address
                }
            }
        }
        return '127.0.0.1'
    }
    getPort() {
        return this.port
    }
    openBoard() {
        opener(`http://${this.getAddress()}:${this.getPort()}`)
    }
    start() {
        if (!this.app) {
            this.createServer()
            this.createSocketServer()
            this.listen()
            console.log(`server start at port: ${this.getPort()}...`)
        }
        return this
    }
}

if (process.argv.indexOf('--mode=dev') > -1)
    new ServerApp({ port: 9222 }).start().openBoard()

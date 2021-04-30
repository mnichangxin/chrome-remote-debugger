import path from 'path'
import http from 'http'
import Koa from 'koa'
import Logger from 'koa-logger'
import IO from 'socket.io'
import StaticFile from './middlewares/staticFile'
import Controller from './middlewares/controller'

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

ioServer.on('connection', socket => {
    socket.on('message', arg => {
        console.log(arg)
    })
})

server.on('upgrade', (req, socket, head) => {
    console.log(req)
})

server.listen(8080)

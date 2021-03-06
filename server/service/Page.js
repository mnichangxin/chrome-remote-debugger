import WebSocket from 'ws'
import chalk from 'chalk'
import SocketManage from './SocketManage'

export default class Page {
    constructor(ioServer, params) {
        this.pid = ''
        this.wsOrigin = ''
        this.metaData = {}
        this.buffer = []
        this.ws = null
        this.socket = null
        this.devtoolsConnected = false
        this.ioServer = ioServer.of(`/devtools/page/${params.pid}`)
        this.wsServer = new WebSocket.Server({ noServer: true })

        Object.keys(params).forEach(key => {
            if (key === 'metaData')
                this.metaData = JSON.parse(decodeURIComponent(params[key]))
            else this[key] = params[key] || ''
        })

        this.ioServer.on('connection', socket => {
            this.socket = socket
            this.socket.on('connected', this.clientConnect.bind(this))
        })
    }
    clientConnect() {
        this.socket.on('cdp', this.forwardToDevTools.bind(this))
        this.socket.on('disconnect', this.clientDisconnect.bind(this))
        SocketManage.getInstance().addPage(this)
        console.log(
            chalk.green(`[crd] pid: ${this.pid} connect to ioServer...`)
        )
    }
    clientDisconnect() {
        this.ioServer.removeAllListeners()
        SocketManage.getInstance().removePage(this)
        console.log(
            chalk.green(`[crd] pid: ${this.pid} disconnect to ioServer...`)
        )
    }
    devtoolsConnect() {
        this.devtoolsConnected = true
        this.ws.on('message', this.forwardToClient.bind(this))
        this.ws.on('close', this.devtoolsDisconnect.bind(this))
        this.flushBuffer()
        console.log(
            chalk.green(`[crd] pid: ${this.pid} connect to Chrome DevTools...`)
        )
    }
    devtoolsDisconnect() {
        this.devtoolsConnected = false
        console.log(
            chalk.green(
                `[crd] pid: ${this.pid} disconnect to Chrome DevTools...`
            )
        )
    }
    handleUpgrade(req, socket, head) {
        this.wsServer.handleUpgrade(req, socket, head, ws => {
            this.ws = ws
            this.devtoolsConnect()
        })
    }
    flushBuffer() {
        this.buffer.forEach(message => {
            this.ws.send(message)
        })
    }
    forwardToDevTools(message) {
        if (!this.devtoolsConnected) {
            this.buffer.push(message)
            return
        }
        this.ws.send(message)
    }
    forwardToClient(message) {
        this.socket.emit('cdp', message)
    }
}

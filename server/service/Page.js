import WebSocket from 'ws'
import SocketManage from './SocketManage'

export default class Page {
    constructor(ioServer, params) {
        this._pid = ''
        this._title = ''
        this._url = ''
        this._wssHost = ''
        this._isConnectedToDevtools = false
        this._domains = []
        this._ioServer = ioServer.of(`/devtools/page/${params.pid}`)
        this._wss = new WebSocket.Server({ noServer: true })

        Object.keys(params).forEach(key => {
            this[`_${key}`] = params[key] || ''
        })

        this._ioServer.on('connection', socket => {
            socket.on('ioConnect', this.ioConnect(socket))
        })
    }
    ioConnect(socket) {
        return () => {
            socket.on('disconnect', this.ioDisconnect.bind(this))
            SocketManage.getInstance().addPage(this)
            console.log(`[pid: ${this._pid}] connect to ioServer...`)
        }
    }
    ioDisconnect() {
        this._ioServer.removeAllListeners()
        SocketManage.getInstance().removePage(this)
        console.log(`[pid: ${this._pid}] disconnect to ioServer...`)
    }
    devtoolsConnect(ws) {
        console.log(`[pid: ${this._pid}] connect to Chrome DevTools...`)

        ws.on('message', msg => {
            console.log(msg)
        })
        ws.on('close', this.devtoolsDisconnect.bind(this))
    }
    devtoolsDisconnect() {
        console.log(`[pid: ${this._pid}] disconnect to Chrome DevTools...`)
    }
    handleUpgrade(req, socket, head) {
        this._wss.handleUpgrade(
            req,
            socket,
            head,
            this.devtoolsConnect.bind(this)
        )
    }
}

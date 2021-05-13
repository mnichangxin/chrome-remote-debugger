import WebSocket from 'ws'
import CDP from './index'

export default class Page {
    constructor(ioServer, params) {
        this._pid = ''
        this._title = ''
        this._url = ''
        this._isConnectedToDevtools = false
        this._domains = []
        this._ioServer = ioServer.of(`/page/${params.pid}`)
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
            CDP.getInstance().addPage(this)
            console.log(`[pid: ${this._pid}] connect ioServer...`)
        }
    }
    ioDisconnect() {
        this._ioServer.removeAllListeners()
        CDP.getInstance().removePage(this)
        console.log(`[pid: ${this._pid}] disconnect ioServer...`)
    }
    handleUpgrade(req, socket, head) {
        this._wss.handleUpgrade(req, socket, head, ws => {
            console.log(`[pid: ${this._pid}] upgrade`)
        })
    }
}

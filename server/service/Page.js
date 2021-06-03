import WebSocket from 'ws'
import SocketManage from './SocketManage'
import CDP from '../cdp'

export default class Page {
    constructor(ioServer, params) {
        this._pid = ''
        this._title = ''
        this._url = ''
        this._wssHost = ''
        this._isConnectedToDevtools = false
        this._domains = []
        this._buffer = []
        this._cdp = null
        this._ws = null
        this._ioServer = ioServer.of(`/devtools/page/${params.pid}`)
        this._wsServer = new WebSocket.Server({ noServer: true })

        this.id = 0

        Object.keys(params).forEach(key => {
            this[`_${key}`] = params[key] || ''
        })

        this._ioServer.on('connection', socket => {
            socket.on('ioConnect', this.ioConnect(socket))
        })
    }
    ioConnect(socket) {
        return () => {
            socket.on('result', this.sendToDevTools.bind(this))
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
        this._ws = ws
        this._cdp = new CDP(ws)
        this.flushBuffer()

        ws.on('message', msg => this.handleReceiveMsg(JSON.parse(msg)))
        ws.on('close', this.devtoolsDisconnect.bind(this))
    }
    devtoolsDisconnect() {
        console.log(`[pid: ${this._pid}] disconnect to Chrome DevTools...`)
    }
    handleUpgrade(req, socket, head) {
        this._wsServer.handleUpgrade(
            req,
            socket,
            head,
            this.devtoolsConnect.bind(this)
        )
    }
    flushBuffer() {
        this._buffer.forEach(msg => {
            this._ws.send(JSON.stringify(msg))
        })
    }
    sendToDevTools(msg) {
        if (!this._ws) {
            this._buffer.push(msg)
            return
        }
        this._ws.send(JSON.stringify(msg))
    }
    handleReceiveMsg(msg) {
        const { id, method } = msg
        // let domain = undefined
        // let property = undefined
        // if (typeof method === 'string') {
        //     const domainArr = method.split('.')
        //     domain = domainArr[0]
        //     property = domainArr[1]
        // }

        if (method === 'Page.getResourceTree') {
            this._ws.send(
                JSON.stringify({
                    id,
                    method,
                    result: {
                        frameTree: {
                            childFrames: [],
                            frame: {
                                id: 1,
                                loaderId: '10',
                                mimeType: 'text/html',
                                securityOrigin: 'https://www.baidu.com',
                                url: 'https://www.baidu.com'
                            }
                        }
                    }
                })
            )
        } else {
            this._ws.send(
                JSON.stringify({
                    id,
                    method,
                    result: {}
                })
            )
        }
    }
}

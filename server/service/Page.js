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
        this._cdp = null
        this._ioServer = ioServer.of(`/devtools/page/${params.pid}`)
        this._wss = new WebSocket.Server({ noServer: true })

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
        this._cdp = new CDP(ws)
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'Page.frameStartedLoading',
                params: {
                    frameId: 'qazws134xedc12ewkda'
                }
            })
        )
        this._cdp.send(
            JSON.stringify({
                method: 'Page.frameNavigated',
                params: {
                    frame: {
                        id: 'qazws134xedc12ewkda',
                        loaderId: 'qazws134xedc12ewkda0',
                        mimeType: 'text/html',
                        securityOrigin: '/',
                        url:
                            'file:///Users/lichangxin/Project/chrome-remote-debugger/test/demo.html'
                    }
                }
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'Network.enable'
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'Page.enable'
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'Runtime.enable'
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'Debugger.enable'
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'DOM.enable'
            })
        )
        this._cdp.send(
            JSON.stringify({
                id: ++this.id,
                method: 'CSS.enable'
            })
        )

        ws.on('message', msg => this.handleReceiveMsg(ws, JSON.parse(msg)))
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
    handleReceiveMsg(ws, msg) {
        const { id, method, params } = msg
        let domain = undefined
        let property = undefined
        if (typeof method === 'string') {
            const domainArr = method.split('.')
            domain = domainArr[0]
            property = domainArr[1]
        }

        // ws.send(
        //     JSON.stringify({
        //         id,
        //         method,
        //         result: {}
        //     })
        // )
    }
}

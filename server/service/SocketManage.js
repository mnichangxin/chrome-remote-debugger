import Page from './Page'

export default class SocketManage {
    static instance = null
    static getInstance(ioServer) {
        if (!SocketManage.instance)
            SocketManage.instance = new SocketManage(ioServer)
        return SocketManage.instance
    }
    constructor(ioServer) {
        this._ioServer = ioServer
        this._ioJsonServer = ioServer.of('/json')
        this._pages = []
    }
    newPage(params) {
        const pid = params.pid || ''

        if (this._pages.findIndex(page => page._pid === pid) > -1) {
            console.log(`[pid: ${pid}] already register`)
            return pid
        } else {
            new Page(this._ioServer, params)
            return null
        }
    }
    addPage(page) {
        this._pages.push(page)
        this.emitJson()
    }
    removePage(page) {
        const pageIndex = this._pages.indexOf(page)
        this._pages.splice(pageIndex, 1)
        this.emitJson()
    }
    emitJson() {
        this._ioJsonServer.emit('json', this.jsonForPages())
    }
    jsonForPages() {
        return this._pages.map(page => {
            const {
                _pid: pid,
                _title: title,
                _url: url,
                _wsHost: wsHost
            } = page
            const devtoolsPath = `${wsHost}/devtools/page/${pid}`
            return {
                pid,
                title,
                url,
                devtoolsFrontendUrl: `/devtools/inspector.html?ws=${devtoolsPath}`,
                webSocketDebuggerUrl: `ws://${devtoolsPath}`
            }
        })
    }
    upgradeWssSocket(req, socket, head) {
        try {
            this._pages.forEach(page => {
                if (req.url === `/devtools/page/${page._pid}`) {
                    return page.handleUpgrade(req, socket, head)
                } else {
                    socket.destroy()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

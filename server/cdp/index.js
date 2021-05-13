import Page from './page'

export default class CDP {
    static instance = null
    static getInstance(ioServer) {
        if (!CDP.instance) CDP.instance = new CDP(ioServer)
        return CDP.instance
    }
    constructor(ioServer) {
        this._ioServer = ioServer
        this._pages = []
    }
    newPage(params) {
        const pid = params.pid || ''

        if (this._pages.findIndex(page => page._pid === pid) > -1) {
            console.log(`[pid: ${pid}] already register`)
        } else {
            new Page(this._ioServer, params)
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
        this._ioServer.of('/json').emit('json', this.jsonForPages())
    }
    jsonForPages() {
        return this._pages.map(page => {
            const { _pid: pid, _title: title, _url: url } = page
            const host = new URL(url).host
            const devtoolsPath = `${host}/inspect/${pid}`
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
        // try {
        //     this._pages.forEach(page => {
        //         if (new URL(req._url).pathname === `/inspect/${page._pid}`) {
        //             return page.handleUpgrade(req, socket, head)
        //         }
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
    }
}

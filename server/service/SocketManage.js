import chalk from 'chalk'
import Page from './Page'

export default class SocketManage {
    static instance = null
    static getInstance(ioServer) {
        if (!SocketManage.instance)
            SocketManage.instance = new SocketManage(ioServer)
        return SocketManage.instance
    }
    constructor(ioServer) {
        this.ioServer = ioServer
        this.ioJsonServer = ioServer.of('/json')
        this.pages = []
    }
    newPage(params) {
        const pid = params.pid || ''

        if (this.pages.findIndex(page => page.pid === pid) > -1) {
            console.log(chalk.green(`[crd] pid: ${pid} already register`))
            return pid
        } else {
            new Page(this.ioServer, params)
            return null
        }
    }
    addPage(page) {
        this.pages.push(page)
        this.emitJson()
    }
    removePage(page) {
        const pageIndex = this.pages.indexOf(page)
        this.pages.splice(pageIndex, 1)
        this.emitJson()
    }
    emitJson() {
        this.ioJsonServer.emit('json', this.jsonForPages())
    }
    jsonForPages() {
        return this.pages.map(page => {
            const { pid, wsOrigin, metaData } = page
            const devtoolsPath = `${wsOrigin}/devtools/page/${pid}`
            return {
                pid,
                metaData,
                devtoolsFrontendUrl: `/devtools/inspector.html?ws=${devtoolsPath}`,
                webSocketDebuggerUrl: `ws://${devtoolsPath}`
            }
        })
    }
    upgradeWssSocket(req, socket, head) {
        try {
            this.pages.forEach(page => {
                if (req.url === `/devtools/page/${page.pid}`) {
                    return page.handleUpgrade(req, socket, head)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

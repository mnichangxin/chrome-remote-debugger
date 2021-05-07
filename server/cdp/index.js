import Page from './page'

export default class CDP {
    constructor() {
        this._pages = []
    }
    static instance = null
    static getInstance() {
        if (!CDP.instance) CDP.instance = new CDP()
        return CDP.instance
    }
    getPages() {
        return this._pages
    }
    addPage(params) {
        const pid = params.pid || ''

        if (this._pages.findIndex(page => page._pid === pid) > -1) {
            console.log(`pid: ${pid} already register`)
        } else {
            this._pages.push(new Page(params))
        }
    }
    removePage(page) {
        const pageIndex = this._pages.indexOf(page)
        this._pages.splice(pageIndex, 1)
    }
    upgradeWssSocket(req, socket, head) {
        console.log('Upgrade wssSocket')
        const pages = this._pages

        console.log(this)

        // pages.forEach(page => page.handleUpgrade())
    }
}

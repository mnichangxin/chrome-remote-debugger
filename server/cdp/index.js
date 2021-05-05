export default class CDP {
    constructor() {
        this.pages = []
    }
    static instance = null
    static getInstance() {
        if (!CDP.instance) CDP.instance = new CDP()
        return CDP.instance
    }
    getPages() {
        return this.pages
    }
    addPage(page) {
        this.pages.push(page)
    }
    removePage(page) {
        const pageIndex = this.pages.indexOf(page)
        this.pages.splice(pageIndex, 1)
    }
    upgradeWssSocket(req, socket, head) {
        console.log('Upgrade wssSocket')
    }
}

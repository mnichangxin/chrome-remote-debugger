import WebSocket from 'ws'

export default class Page {
    constructor(params) {
        this._pid = ''
        this._title = ''
        this._url = ''
        this._hostname = ''
        this._isConnectedToDevtoolsFrontend = false
        this._domains = []
        this._wss = new WebSocket.Server({ noServer: true })

        Object.keys(params).keys(key => {
            this[`_${key}`] = params[key] || ''
        })
    }
    handleUpgrade() {
        this._wss.handleUpgrade(req, socket, head, ws => {
            console.log(`handle pid: ${this._pid} upgrade`)
        })
    }
}

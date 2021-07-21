import chobitsu from '@ksky521/chobitsu'
import Socket from './socket'
import { mergeOptions } from './options'
import { request, to, getWsUrlOrigin } from './utils'

export default class DebuggerClient {
    constructor(options) {
        options = mergeOptions(options)
        this.pid = options.pid
        this.title = options.title
        this.url = options.url
        this.wsHost = options.wsHost
        this.socket = null
    }
    async register() {
        const url = `//${getWsUrlOrigin(this.wsHost)}/register`
        const requestData = {
            pid: this.pid,
            title: this.title,
            url: this.url,
            wsHost: this.wsHost
        }
        const [err, res] = await to(
            request({
                url,
                method: 'post',
                formType: true,
                data: requestData
            })
        )
        if (err) return [err, null]
        if (res.errNo === 0) return [null, res]
        return [null, null]
    }
    initSocket() {
        const wsUrlOrigin = getWsUrlOrigin(this.wsHost)
        this.socket = new Socket(
            `ws://${wsUrlOrigin}/devtools/page/${this.pid}`
        )
        this.socket.io.emit('connected')
        this.socket.io.on('cdp', chobitsu.sendRawMessage.bind(chobitsu))
        chobitsu.setOnMessage(message => this.socket.io.emit('cdp', message))
    }
    async init() {
        const [err, res] = await register()
        if (err) return console.log(err)
        if (res) this.initSocket()
        else console.log('Please refresh page to retry...')
    }
}

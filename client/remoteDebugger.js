import io from 'socket.io-client'
import chobitsu from '@ksky521/chobitsu'
import { request, to, generatePid, getWsUrlOrigin } from './utils'

export default class RemoteDebugger {
    constructor(options) {
        this.socket = null
        options = this.mergeOptions(options)
        Object.keys(options).forEach(key => {
            this[key] = options[key]
        })
    }
    async inspectorPage() {
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
        if (err) throw err
        if (res.errNo === 0) this.connectSocket()
    }
    send(CDP) {
        this.socket.emit('cdp', CDP)
    }
    initDomains() {
        for (let [name, domain] of Object.entries(domains)) {
            this.domains[name] = domain
        }
    }
    initSocketEvent() {
        this.socket.emit('connected')
        this.socket.on('cdp', chobitsu.sendRawMessage.bind(chobitsu))
        chobitsu.setOnMessage(this.send.bind(this))
    }
    connectSocket() {
        const wsUrlOrigin = getWsUrlOrigin(this.wsHost)
        const socket = io(`ws://${wsUrlOrigin}/devtools/page/${this.pid}`)
        this.socket = socket
        this.initSocketEvent()
    }
    mergeOptions(options) {
        return {
            pid: generatePid(),
            title: document.title,
            url: location.href,
            wsHost: '//localhost:9222',
            ...options
        }
    }
    init() {
        try {
            this.inspectorPage()
        } catch (e) {
            console.log(e)
        }
    }
}

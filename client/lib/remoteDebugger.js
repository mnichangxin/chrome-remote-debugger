import io from 'socket.io-client'
import domains from './domains'
import dispatch from './dispatch'
import { request, to, generatePid } from './utils/common'
import { getWsUrlOrigin } from './utils/helper'

export default class RemoteDebugger {
    constructor(options) {
        this.domains = {}
        this.initDomains()
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

    initDomains() {
        for (let [name, domain] of Object.entries(domains)) {
            this.domains[name] = domain
        }
    }
    initSocketEvent(socket) {
        socket.emit('connected')
        socket.on('cdp', dispatch.call(socket, this.domains))
    }

    connectSocket() {
        const wsUrlOrigin = getWsUrlOrigin(this.wsHost)
        const socket = io(`ws://${wsUrlOrigin}/devtools/page/${this.pid}`)
        this.initSocketEvent(socket)
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

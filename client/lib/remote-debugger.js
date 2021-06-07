import io from 'socket.io-client'
import { request, to, generatePid } from '../lib/utils/common'
import { getWsUrlOrigin } from '../lib/utils/helper'

export default class RemoteDebugger {
    constructor(options) {
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

    connectSocket() {
        const wsUrlOrigin = getWsUrlOrigin(this.wsHost)
        const socket = io(`ws://${wsUrlOrigin}/devtools/page/${this.pid}`)
        this.initSocketEvent(socket)
    }

    initSocketEvent(socket) {
        socket.emit('ioConnect')
        socket.emit('result', {
            method: 'Runtime.executionContextCreated',
            params: {
                context: {
                    auxData: {
                        frameId: '1.0',
                        isDefault: true
                    },
                    id: 1,
                    name: document.title,
                    origin: 'https://www.baidu.com'
                }
            }
        })
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

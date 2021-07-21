import io from 'socket.io-client'

export default class Socket {
    constructor(url) {
        this.io = null
        if (typeof url === 'string') this.connect(url)
    }
    connect(url) {
        if (!this.io) this.io = io(url)
    }
    disconnect(callback) {
        this.io.close(callback)
    }
}

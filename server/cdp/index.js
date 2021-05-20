import * as Page from './Page'
import * as Target from './Target'

export default class CDP {
    constructor(ws) {
        this.ws = ws
    }
    Page() {
        return Page
    }
    Target() {
        return Target
    }
    send(obj) {
        return this.ws.send(obj)
    }
}

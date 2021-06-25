export default function(domains) {
    return CDP => {
        const { id, params, method } = CDP
        const domainArr = method.split('.')
        const [domain, subDomain] = domainArr

        let response = {}

        if (id) response.id = id

        if (!domains[domain]) {
            response.result = `Not support domain [${domain}]`
        } else {
            const execResult = domains[domain][subDomain]
            response.method = method
            response.result = execResult ? execResult(params || {}) : {}
        }

        this.emit('cdp', response)
    }
}

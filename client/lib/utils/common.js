import xhr from 'xhr'

export const json2FormUrl = jsonData => {
    let formUrl = ''

    Object.keys(jsonData).forEach((key, i) => {
        if (i > 0) formUrl += '&'
        formUrl += `${key}=${jsonData[key]}`
    })

    return formUrl
}

export const request = ({ url, method, formType, ...options }) =>
    new Promise((resolve, reject) => {
        if (formType) {
            options.headers = {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
            }
            options.data = json2FormUrl(options.data || options.body)
        }
        xhr[method.toLowerCase() || 'get'](url || '', options, (err, res) => {
            if (err) return reject(err)
            if (res.statusCode < 200 || res.statusCode >= 400)
                return reject('Network error, please retry...')
            return resolve(JSON.parse(res.body))
        })
    })

export const to = (promise, errExt) =>
    promise
        .then(data => [null, data])
        .catch(err => {
            if (errExt) Object.assign(err, errExt)
            return [err, undefined]
        })

export const randomString = e => {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''

    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))

    return n
}

export const generatePid = () => {
    const currentScript = document.currentScript

    if (currentScript && currentScript.dataset.pid) {
        return currentScript.dataset.pid
    }

    return randomString()
}

import xhr from 'xhr'
import { nanoid } from 'nanoid'

export const json2FormUrl = jsonData => {
    let formUrl = ''

    Object.keys(jsonData).forEach((key, i) => {
        if (i > 0) formUrl += '&'
        formUrl += `${key}=${jsonData[key]}`
    })

    return formUrl
}

export const getWsUrlOrigin = wsHost =>
    wsHost.replace(/^((https?|ws):\/\/|\/\/)/, '')

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

export const getRandomString = e => {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''

    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))

    return n
}

export const getCurrentScript = () => {
    if (document.currentScript) return document.currentScript
    const scriptElements = document.scripts || []
    const currentScript = scriptElements[scriptElements.length - 1]
    if (currentScript) return currentScript
    return null
}

export const getQuery = () => {
    const query = {}
    const search = location.search.replace('?', '')
    if (search) {
        const searchStrArr = search.split('&')
        searchStrArr.forEach(searchStrItem => {
            const queryStrArr = searchStrItem.split('=')
            const [key, value] = queryStrArr
            query[key] = value
        })
    }
    return query
}

export const generatePid = (cache = true) => {
    const currentScript = getCurrentScript()
    let pid = getRandomString()

    if (cache) {
        const storageKey = `__crd_${location.origin}${location.pathname}`
        const storageValue = localStorage.getItem(storageKey)

        if (storageValue) {
            pid = storageValue
        } else {
            localStorage.setItem(storageKey, pid)
        }
    }
    if (!cache && currentScript && currentScript.dataset.pid) {
        return currentScript.dataset.pid
    }

    return pid
}

export const generateUuid = () => nanoid()

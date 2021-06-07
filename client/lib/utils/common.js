import xhr from 'xhr'
import { json2FormUrl, randomString } from './helper'

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

export const generatePid = (cache = true) => {
    const currentScript = document.currentScript
    let pid = randomString()

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

import xhr from 'xhr'
import { json2FormUrl, randomString } from './helper'

const flatten = arr =>
    arr.reduce(
        (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
        []
    )

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

export const getAttributes = namedNodeMap => {
    if (!namedNodeMap) {
        return
    }
    const attributes = namedNodeMap
        .toArray()
        .map(attr => [attr.name, attr.value])
    return flatten(attributes)
}

export function getDriverOrigin() {
    /**
     * check if executed by launcher script
     */
    if (document.currentScript && document.currentScript.src) {
        return `http://${document.currentScript.src.split('/').slice(2, 3)[0]}`
    }

    if (
        document.currentScript &&
        document.currentScript.getAttribute('data-proxy-host')
    ) {
        return `http://${document.currentScript.getAttribute(
            'data-proxy-host'
        )}`
    }

    if (window._proxyHost) {
        return window._proxyHost
    }

    return 'http://localhost:9222'
}

export const getTitle = () => {
    let title = ''
    const titleTag = document.querySelector('title')
    if (titleTag) {
        title = titleTag.text
    }
    return title
}

export const getDescription = () => {
    let description = ''
    const metaTags = document.querySelectorAll('meta')
    for (let i = 0; i < metaTags.length; ++i) {
        const tag = metaTags[i]
        if (tag.getAttribute('name') !== 'description') {
            continue
        }
        description = tag.getAttribute('content')
    }

    return description
}

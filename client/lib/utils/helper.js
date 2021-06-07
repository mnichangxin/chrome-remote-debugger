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

export const randomString = e => {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''

    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))

    return n
}

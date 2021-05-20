export const frameStartedLoading = headers => {
    let setCookieHeader = headers['set-cookie']

    if (Array.isArray(setCookieHeader)) {
        setCookieHeader = setCookieHeader.join('')
    }
    if (!setCookieHeader || !setCookieHeader.match(/frameId=(\d+\.\d+)/)) {
        return
    }

    const frameId = setCookieHeader.match(/frameId=(\d+\.\d+)/)[1]

    this.send({
        method: 'Page.frameStartedLoading',
        params: { frameId }
    })
}

export const frameNavigated = (frameId, origin, url) => {
    this.send({
        method: 'Page.frameNavigated',
        params: {
            frame: {
                id: frameId,
                loaderId: `${frameId}0`,
                mimeType: 'text/html',
                securityOrigin: origin,
                url: `${origin}${url}`
            }
        }
    })
}

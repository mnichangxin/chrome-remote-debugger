import CDP from '../cdp'

export const index = ctx => {
    ctx.response.body = '<p>Index</p>'
}

export const register = ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.type = 'json'
    CDP.getInstance().addPage(ctx.request.body)
    ctx.body = JSON.stringify({
        errCode: 0,
        errStr: 'Register page success',
        data: null
    })
}

export const json = ctx => {
    const pages = CDP.getInstance().getPages()
    const jsonData = pages.map(page => {
        const { pid, title, url, hostname } = page
        const devtoolsPath = `${hostname}/inspect/${pid}`

        return {
            pid,
            title,
            url: url.href,
            devtoolsFrontendUrl: `${hostname}/app/inspector.html?ws=${devtoolsPath}`,
            webSocketDebuggerUrl: 'ws://' + devtoolsPath
        }
    })
    ctx.type = 'json'
    ctx.body = JSON.stringify(jsonData)
}

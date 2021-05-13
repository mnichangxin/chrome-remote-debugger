import CDP from '../cdp'

export const index = ctx => {
    ctx.redirect('/view/index.html')
}

export const register = ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.type = 'json'
    CDP.getInstance().newPage(ctx.request.body)
    ctx.body = JSON.stringify({
        errCode: 0,
        errStr: 'register page success',
        data: null
    })
}

export const json = ctx => {
    const jsonData = CDP.getInstance().jsonForPages()
    ctx.type = 'json'
    ctx.body = JSON.stringify({
        errCode: 0,
        errStr: 'success',
        data: jsonData
    })
}

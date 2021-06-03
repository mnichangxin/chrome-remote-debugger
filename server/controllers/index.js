import SocketManage from '../service/SocketManage'

export const index = ctx => {
    ctx.redirect('/view/index.html')
}

export const register = ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.type = 'json'
    SocketManage.getInstance().newPage(ctx.request.body)
    ctx.body = JSON.stringify({
        errNo: 0,
        errStr: 'success',
        data: null
    })
}

export const json = ctx => {
    const jsonData = SocketManage.getInstance().jsonForPages()
    ctx.type = 'json'
    ctx.body = JSON.stringify({
        errNo: 0,
        errStr: 'success',
        data: jsonData
    })
}

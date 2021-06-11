import SocketManage from '../service/SocketManage'

export const index = ctx => {
    ctx.redirect('/view/index.html')
}

export const register = ctx => {
    const pid = SocketManage.getInstance().newPage(ctx.request.body)

    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.type = 'json'

    if (pid) {
        ctx.body = JSON.stringify({
            errNo: 1,
            errStr: `pid: ${pid} already register`,
            data: null
        })
    } else {
        ctx.body = JSON.stringify({
            errNo: 0,
            errStr: 'success',
            data: null
        })
    }
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

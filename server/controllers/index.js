export const index = ctx => {
    ctx.response.body = '<p>Index</p>'
}

export const register = ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set(
        'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'
    )
    ctx.response.body = "{ errCode: 0, errStr: 'Register page success' }"
}

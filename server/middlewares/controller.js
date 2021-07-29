const addMapping = (router, mapping) => {
    const SUPPORT_METHODS = ['all', 'get', 'post', 'put', 'delete', 'options']

    for (let url in mapping) {
        const urlSplitArr = url.split(' ')
        const reqMethod = urlSplitArr[0].toLowerCase()
        const routePath = urlSplitArr.length > 1 ? urlSplitArr[1] : ''
        const handler = mapping[url]

        if (SUPPORT_METHODS.indexOf(reqMethod) > -1) {
            router[reqMethod](routePath, handler)
        } else {
            console.log(`Not support method: ${url}`)
        }
    }
}

export default (routes = {}) => {
    const router = require('koa-router')()

    addMapping(router, routes)

    return async (ctx, next) => {
        await router.routes()(ctx, next)
    }
}

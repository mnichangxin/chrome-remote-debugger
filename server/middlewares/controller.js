import fs from 'fs'
import path from 'path'

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
const addControllers = (router, routesDir) => {
    const routesPath = path.resolve(__dirname, '../', routesDir)
    const files = fs.readdirSync(routesPath)
    const routeFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.ts'))

    routeFiles.forEach(fileName => {
        const mapping = require(path.resolve(routesPath, fileName)).default
        addMapping(router, mapping)
    })
}

export default dir => {
    const routesDir = dir || 'routes'
    const router = require('koa-router')()

    addControllers(router, routesDir)

    return async (ctx, next) => {
        await router.routes()(ctx, next)
        next()
    }
}

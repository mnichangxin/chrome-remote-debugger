import path from 'path'
import fs from 'fs'

export default (root, pathname) => {
    root = root || '/'
    pathname =
        typeof pathname === 'string' && pathname.startsWith('/')
            ? pathname.slice(1)
            : ''

    return async (ctx, next) => {
        try {
            const reg = new RegExp(`^\/${pathname}.*?`, 'g')
            const reqPath = ctx.path
            const matchArr = reqPath.match(reg)
            if (matchArr && matchArr.length) {
                const splitArr = reqPath.split('/')
                const fileName = splitArr[splitArr.length - 1] || 'index.html'
                const fileExtName = path.extname(fileName)
                const file = fs.readFileSync(path.resolve(root, fileName))

                ctx.type = fileExtName.replace('.', '')
                ctx.body = file
            } else {
                await next()
            }
        } catch (err) {
            ctx.status = 404
            ctx.body = 'Not Found'
        }
    }
}

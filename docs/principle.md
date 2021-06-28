# Chrome DevTools 调试协议及实战

Chrome DevTools 是前端开发者经常用到的工具之一，无论是普通页面、移动端 Webview、小程序、甚至 Node 应用，都可以用它来调试。

Chrome DevTools 提供了丰富的调试功能，包括 DOM、网络、debugger 调试、性能分析等。

那么，我们思考 Chrome DevTools 是如何能够具有多端调试能力的呢，它是基于什么原理开发的呢，下面我们一起去探索。

## 架构原理

Chrome DevTools 的架构，相当于前后端分离的架构，用一张图来描述就是：

![](/docs/assets/1.png)

具体可以划分为调试器的前端和调试器的后端：

1. 调试器前端：调试器的可视化界面，对于 Chrome 来说，就是 DevTools；另外也有许多库 Puppeteer、NDB 等
2. 调试器后端：实现了调试协议的宿主环境，如 Chrome 的环境、Node 环境等
3. 调试协议：前后端消息的协议，通过 socket 双工通信建立协议的连接

## 探索

Chrome DevTools 实现了调试协议，以下称调试协议为 CDP（Chrome DevTools Protocol），CDP 的[官方文档](https://chromedevtools.github.io/devtools-protocol/) 提供了如何查看
CDP 调用链路的方法：

1. 首先，用命令行的方式启用 Chrome， 附带参数连接 debug 端口 9222：

```sh
    chrome --remote-debugging-port=9222
```

2. Chrome 启动后，打开调试工具在设置中开启 Protocol monitor，也就是 CDP 监控工具，之后可以看到 CDP 的调用情况：

![](/docs/assets/2.png)

## 业务痛点与思考

Chrome DevTools 在调试 PC 页面的时候很方便，调试端内 Webview 的时候无能为力； VConsole 在移动端页面的能力相对于 DevTools 太弱。

我们思考，既然无法直接调试 Webview，我们是否可以利用获取到 Webview 的一些关键信息，通过中间服务转发到 Chrome DevTools，同时 Chrome DevTools 的一些动作也可以通过中间服务转发到 Webview。于是，决定尝试一下。

## 实战

### 服务模型

### 实现

先用 Koa 创建一个基本的服务，包括路由、日志等中间件。

```js
    const createApp = (port = 9222) => {
        const app = new Koa()
        const koaBodyParser = new KoaBodyParser()
        const logger = new Logger()
        const controller = new Controller()

        app.use(koaBodyParser)
        app.use(logger)
        app.use(controller)
        app.use(
            StaticFile(
                path.resolve(
                    __dirname,
                    '../node_modules/chrome-devtools-frontend/front_end'
                ),
                '/devtools'
            )
        )
        app.use(StaticFile(path.resolve(__dirname, '../client'), '/client'))
        app.use(StaticFile(path.resolve(__dirname, '../views'), '/view'))
        app.use(StaticFile(path.resolve(__dirname, '../test'), '/test'))

        const server = http.createServer(app.callback())
        const ioServer = IO(server, {
            cors: {
                origin: '*'
            }
        })
        const cdp = SocketManage.getInstance(ioServer)

        server.on('upgrade', cdp.upgradeWssSocket.bind(cdp))

        server.listen(port)

        console.log(`server start at port: ${port}...`)
    }
```








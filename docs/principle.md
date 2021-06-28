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

Chrome DevTools 实现了调试协议，以下把调试协议简称为 CDP（Chrome DevTools Protocol），CDP 的[官方文档](https://chromedevtools.github.io/devtools-protocol/) 提供了如何查看
CDP 调用链路的方法：

1. 首先，启用一个 Chrome 的端口

## 业务痛点

在调试 PC 页面的时候很方便，调试端内 Webview 的时候无能为力；虽然 VConsole 在移动端页面的能力相对于 DevTools 太弱，只能查看

## 应用











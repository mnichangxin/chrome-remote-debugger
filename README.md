# Chrome Remote Debugger

To debugging web page by Chrome DevTools Protocol.

## Install

```sh
    yarn global add chrome-remote-debugger
    # OR
    npm install chrome-remote-debugger -g
```

## Usage

### Start

```sh
    crd start
```

The tool will start on port `9222` by default. If you want to set port, then use `-p` or `--port` short args:

```sh
    crd start [-p, --port <port>]
```

### Open Board

The board UI start autoing at browser when you use start command.

![](./docs/assets/start-board.png)

### Import to SDK to your page

Debugging page must import our SDK to your page. The SDK supports three import methods.

Import as `ESM` or `CJS` , then install package by npm:

```sh
    yarn add @chrome-remote-debugger/client
```

1. ESM:

```js
    import CRD from '@chrome-remote-debugger/client'
```

2. CJS

```js
    const CRD = require('@chrome-remote-debugger/client')
```

3. UMD

```html
    <script type="text/javascript" src="crd.umd.min.js"></script>
```

Then you can new a instance to use it:

```js
    new CRD([options]).init()
```

## SDK Options

* `pid`: Page unique identification, generate autoing when no setting

* `wsHost`: Be registered server address, include `host` and `port`. Generate by local host when no setting. Also, using a query param `remoteServer` cover this setting. For example: `http://10.253.32.115:9222/test/demo.html?remoteServer=10.253.32.115:9222`

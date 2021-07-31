;(function() {
    window.copy = function(text) {
        var inputEle = document.querySelector('input[data-id=crd-copyEle]')
        if (!inputEle) {
            inputEle = document.createElement('input')
            inputEle.setAttribute('readonly', 'readonly')
            inputEle.dataset.id = 'crd-copyEle'
            document.body.appendChild(inputEle)
        }
        inputEle.setAttribute('value', text)
        inputEle.focus()
        inputEle.select()
        document.execCommand('copy')
        inputEle.blur()
        document.body.removeChild(inputEle)
    }
    function renderPagePlatInfoItem(plat, pagePlat) {
        return (
            '<span class="iconfont icon-' +
            plat +
            (plat === pagePlat ? ' active' : '') +
            '"></span>'
        )
    }
    function renderPagePlatInfo(page) {
        var platList = ['android', 'iOS', 'pc', 'unknow']
        var platInfoStr = ''
        var pagePlat = ''

        var platInfo = page.metaData.platInfo

        if (platInfo.platform === 'pc') {
            pagePlat = 'pc'
        } else if (
            platInfo.platform === 'mobile' &&
            (platInfo.system === 'android' || platInfo.system === 'iOS')
        ) {
            pagePlat = platInfo.system
        } else {
            pagePlat = 'unknow'
        }

        platList.forEach(function(plat) {
            platInfoStr +=
                '<li class="page-plat-item" onclick="alert(\'' + page.metaData.userAgent + '\')">' +
                renderPagePlatInfoItem(plat, pagePlat) +
                '</li>'
        })

        return '<ul class="page-plat-info">' + platInfoStr + '</ul>'
    }
    function renderPageContent(page) {
        return (
            '<div class="page-content">\
                <a class="page-title" target="_blank" href="' +
            page.devtoolsFrontendUrl +
            '">\
                    <span class="page-title-text">' +
            page.metaData.title +
            '</span>\
                        <em class="page-title-id">(id: ' +
            page.pid +
            ')</em>\
                    </a>\
                    <p class="page-url"><span class="iconfont icon-fuzhi" onclick="copy(\'' +
            page.metaData.url +
            '\')"></span>\
                    <span class="page-url-text">' +
            page.metaData.url +
            '</span>\
                    </p>\
            </div>'
        )
    }
    function renderPageList(pageList) {
        var renderStr = ''
        if (pageList.length) {
            $('.page-list').show()
            $('.page-list-empty').hide()
            pageList.forEach(function(page) {
                renderStr +=
                    '<li class="page-item">' +
                    renderPageContent(page) +
                    renderPagePlatInfo(page) +
                    '</li>'
            })
            $('.page-list').html(renderStr)
        } else {
            $('.page-list').hide()
            $('.page-list-empty').show()
        }
    }
    function renderHeaderInfo(serverInfo) {
        $('.header-info-host span').html(serverInfo.serverHost || '')
        $('.header-info-port span').html(serverInfo.serverPort || '')
    }

    $.ajax('/serverInfo').then(function(res) {
        if (res.errNo === 0) renderHeaderInfo(res.data || {})
    })
    $.ajax('/json').then(function(res) {
        if (res.errNo === 0) renderPageList(res.data || [])
    })
    io('ws://0.0.0.0:9222/json').on('json', function(data) {
        renderPageList(data || [])
    })
})()

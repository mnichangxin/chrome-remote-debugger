/**
 * ---- Page Domain ----
 */

/**
 * Methods
 */

export function addScriptToEvaluateOnNewDocument() {
    return {}
}
export function bringToFront() {
    return {}
}
export function captureScreenshot() {
    return {}
}
export function createIsolatedWorld() {
    return {}
}
export function disable() {
    return {}
}
export function enable() {
    return {}
}
export function getAppManifest() {
    return {}
}
export function getFrameTree() {
    return {}
}
export function getLayoutMetrics() {
    return {}
}
export function getNavigationHistory() {
    return {}
}
export function handleJavaScriptDialog() {
    return {}
}
export function navigate({ url }) {
    window.localtion.assign(url)
    return {}
}
export function navigateToHistoryEntry({ entryId }) {
    window.history.go(entryId)
    return {}
}
export function printToPDF() {
    return {}
}
export function reload({ ignoreCache }) {
    window.location.reload(Boolean(ignoreCache))
    return {}
}
export function removeScriptToEvaluateOnNewDocument() {
    return {}
}
export function resetNavigationHistory() {
    return {}
}
export function setDocumentContent() {
    return {}
}
export function stopLoading() {
    return {}
}
export function getResourceTree() {
    return {
        frameTree: {
            childFrames: [],
            frame: {
                // id: this.frameId,
                // loaderId: this.frameId + '0',
                id: 0,
                loaderId: '00',
                mimeType: 'text/html',
                securityOrigin: document.location.origin,
                url: document.location.origin
            }
        }
    }
}

/**
 * Events
 */

export function frameStoppedLoading() {
    this.send({
        method: 'Page.frameStoppedLoading',
        params: { frameId: this.frameId }
    })
}
export function loadEventFired() {
    this.send({
        method: 'Page.loadEventFired',
        params: { timestamp: 649314.52695 }
    })
}

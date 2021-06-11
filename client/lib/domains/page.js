/**
 * Methods
 */

export const addScriptToEvaluateOnNewDocument = () => ({})
export const bringToFront = () => ({})
export const captureScreenshot = () => ({})
export const createIsolatedWorld = () => ({})
export const disable = () => ({})
export const enable = () => ({})
export const getAppManifest = () => ({})
export const getFrameTree = () => ({})
export const getLayoutMetrics = () => ({})
export const getNavigationHistory = () => ({})
export const handleJavaScriptDialog = () => ({})
export const navigate = ({ url }) => {
    window.localtion.assign(url)
    return {}
}
export const navigateToHistoryEntry = ({ entryId }) => {
    window.history.go(entryId)
    return {}
}
export const printToPDF = () => ({})
export const reload = ({ ignoreCache }) => {
    window.location.reload(Boolean(ignoreCache))
    return {}
}
export const removeScriptToEvaluateOnNewDocument = () => ({})
export const resetNavigationHistory = () => ({})
export const setDocumentContent = () => ({})
export const stopLoading = () => ({})
export const getResourceTree = () => {
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

// export const frameStoppedLoading = () => {
//     this.execute('Page.frameStoppedLoading', { frameId: this.frameId })
// }
// export const loadEventFired = () => {
//     this.execute('Page.loadEventFired', { timestamp: 649314.52695 })
// }

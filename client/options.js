import { generatePid, getQuery, getWsUrlOrigin } from './utils'

export const defaultOptionsFactory = () => {
    const remoteServerUrl = getQuery().remoteServer
    const hasRemoteServerUrl = !!remoteServerUrl
    const pid = generatePid()
    const wsHost = hasRemoteServerUrl
        ? getWsUrlOrigin(remoteServerUrl)
        : location.host

    return { pid, wsHost, hasRemoteServerUrl }
}

export const mergeOptions = (options = {}) => {
    const defaultOptions = defaultOptionsFactory()
    if (options.wsHost && defaultOptions.hasRemoteServerUrl) {
        options.wsHost = defaultOptions.wsHost
    }
    return {
        ...defaultOptions,
        ...options
    }
}

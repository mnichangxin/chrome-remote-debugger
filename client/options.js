import { generatePid, getQuery, getWsUrlOrigin } from './utils'

export const defaultOptionsFactory = () => {
    const remoteServerUrl = getQuery().remoteServer
    const pid = generatePid()
    const wsHost = remoteServerUrl
        ? getWsUrlOrigin(remoteServerUrl)
        : location.host

    return { pid, wsHost }
}

export const mergeOptions = options => ({
    ...defaultOptionsFactory(),
    ...options
})

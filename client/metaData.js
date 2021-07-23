import { getPlatform } from './utils'

export const getMetaData = () => {
    const { appName, appCodeName, appVersion, language, userAgent } = navigator
    const { title } = document
    const { href: url } = location

    return {
        title: title || 'unknow',
        url: url || '',
        appName: appName || '',
        appCodeName: appCodeName || '',
        appVersion: appVersion || '',
        language: language || '',
        platInfo: getPlatform(userAgent)
    }
}

import { generatePid } from './utils'

export const defaultOptions = {
    pid: generatePid(),
    title: document.title,
    url: location.href,
    wsHost: `//${location.host}`
}

export const mergeOptions = options => ({
    ...defaultOptions,
    ...options
})

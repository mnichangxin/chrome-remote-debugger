export const targetCreated = (pid, title, url) => {
    this.send({
        method: 'Target.targetCreated',
        params: {
            targetInfo: {
                targetId: pid,
                title,
                url,
                type: 'page'
            }
        }
    })
}

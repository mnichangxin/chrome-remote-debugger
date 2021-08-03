declare class ServerApp {
    constructor(options?: object)
    start(): ServerApp
    openBoard(): void
    getAddress(): string
    getPort(): number
}

export = ServerApp

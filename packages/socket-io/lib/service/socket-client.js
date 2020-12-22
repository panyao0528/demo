const io = require('socket.io-client')


class SocketClient {

    static getClient(config) {
        return new SocketClient(config)
    }

    constructor(config) {
        this.config = config
        const { url, clientOpts } = config

        if (!url) {
            throw new Error('must set client url')
        }
        this.url = `${url}/${this.config.nsp}`
        this.opts = clientOpts || {
            forceNew: true,
            transports: ['websocket']
        }
        this.connected = false
        this.initSocket()
    }


    initSocket() {
        this.socket = io(this.url, Object.assign(this.opts, {
            query: {
                auth: 'pangyao'
            }

        }))
        this.socket.on('connect', () => {
            this.connected = true
            console.log(`client connect`)
        })

        this.socket.on('reconnecting', (c) => {
            console.log(`start ${c} reconnect`)
        })

        this.socket.on('disconnect', () => {
            this.connected = false
            console.log(`client disconnect`)
        })
    }

    destory() {
        this.socket.removeAllListeners()
        this.socket.close()
        this.socket = null
    }
}

module.exports = SocketClient
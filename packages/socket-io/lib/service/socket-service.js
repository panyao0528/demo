const Http = require('http')
const io = require('socket.io')

const EVENT_SEND_MSG = 'msg'

class SocketServer {

    constructor(config) {
        this.config = config
        this.opts = Object.assign(config.options || {}, {
            path: '',
            serveClient: false,
            // below are engine.IO options
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        })
        this._initServer()
    }

    _initServer() {
        this.server = Http.createServer()
        this.ioServer = io(this.server, this.opts)
        this.nsp = this.ioServer.of(this.config.nsp) //命名空间实列
        this.ioServer.on('connection', (socket) => {
            console.log('server connection------->',`${JSON.stringify(socket.handshake.query.auth)}`)
            socket.join(['room 237', 'room 238']);
            console.log(`socket rooms------->${JSON.stringify(socket.rooms).toString()}`)
        })
        this.nsp.on('connect', (socket) => {
            console.log('Socket connected',`socket id is ${socket.id}, socket.handshak=>${JSON.stringify()}`)
            console.log('Socket connection------->',`${JSON.stringify(socket.handshake.query.auth)}`)
            socket.join('room')
            socket.to('room').emit('room1','加入 room')
            console.log(`nsp rooms------->${socket.rooms}`)
            this.handler(socket)
        })
    }

    handler(socket) {
        socket.on(EVENT_SEND_MSG, (data) => {
            console.log(`triggen event ,name is ${EVENT_SEND_MSG},send msg is ${data},time=> ${new Date().getSeconds()}`)
        })

        socket.on('disconnect', () => {
            console.log('Occur disconnect event.')
        })
    }

    start() {
        this.server.listen(this.config.port || 9000)
        console.log(`server start,listen port ${this.config.port}`)
    }

    stop() {
        this.nsp.removeAllListeners()
        this.ioServer.removeAllListeners()
        this.ioServer.close()
        this.server.close()
        console.log('socker server closed')
    }

}

module.exports = SocketServer
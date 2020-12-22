module.exports = {
    server: require('./socket-service'),
    client: require('./socket-client')
}

// module.exports=Object.assign({},require('./socket-service'),require('./socket-client'))
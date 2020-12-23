# `socket-io`

> TODO: description

## Usage

## socketio心得

```
server端
 //namespace
 1. socket.of(nsp) nsp 命名空间 一个socket server可以创建多个命名空间，
                       客户端可通过不同命名空间来连接服务，一次分解tcp连接，减少压力

 2. socket.join(room) 加入rooms，对于rooms可以群发消息，对加入此room的客户端广播发消息，socket.to(room).emit(eventName,fn)
    除自己以外的客户端可以收到该事件的消息，广播消息 one => many(no self)

 3.namespace与room机制是为了广播，群体通知   
   

```


```
const socketIo = require('socket-io');

// TODO: DEMONSTRATE API
```

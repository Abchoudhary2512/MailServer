const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    allowInsecureAuth:true,
    authOptional: true,
    onConnect(session,cb){
        console.log(`onConnect`,session.id)
        cb() //accept the connection
    },
    onMailFrom(address,session,cb){
        console.log(`onMailFrom`,address.address,session.id)
        cb() //accept mail from
    },
    onRcptTo(address,session,cb){
        console.log(`onRcptto`,address.address,session.id)
        cb()
    },
    onData(stream,session,cb){
        stream.on('data',(data) => console.log(`onData ${data.toString()}`))
        stream.off('end',cb);
    }
});

server.listen(25,()=> console.log('server running on 25'))

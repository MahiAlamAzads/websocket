import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 }); //Zombie http server

// Connection event

wss.on('connection', (socket, request) => { //here on connection, we will get two parameter "socket:WebSocket and request:IncomingMessage"
    const ip = request.socket.remoteAddress; //here remote address means the ip of client;

    socket.on('message', (rawData) => {
        // here the raw data I am getting from the parameter is binary
        // so convert it to string
        const message = rawData.toString()
        console.log({ message })

        //here for every client who is connected by this socket -- we used forEach()
        wss.clients.forEach((client) => {
            // Value	Constant	            Meaning
            // 0	    WebSocket.CONNECTING	Connection is being set up
            // 1	    WebSocket.OPEN	        Open(The only state where you safely .send())
            // 2	    WebSocket.CLOSING	    Connection is closing
            // 3	    WebSocket.CLOSED	    Connection is closed
            if (client.readyState === WebSocket.OPEN) client.send(`server Broadcast: ${message}`)
        })
    });

    socket.on('error', (err)=>{
        console.error(`Error: ${err} ${ip}`);
    })

    socket.on('close', ()=>{
        console.log("Client Disconnected");
    })
})

console.log("WebSocket Server is live on ws://localhost:8080");
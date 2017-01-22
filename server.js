'use strict'
const ws = require('ws').Server;
const server = new ws({port: 8000});
const users = [];

if (server) {
  console.log("Listening on port 8000");

  server.on('connection', (socket) => {
    //construct a new object literal
    //set one key that is a GUID
    //set one key that is the socket itself
    users.push(socket);
//    console.log("Got a new connection.");
    //send GUID with acknowledgement message for caching on client
    let welcome = {name: "SYSTEM", message: "Welcome to chat."};
    socket.send(JSON.stringify(welcome));
    socket.on('message', (message) => {
//     console.log("Got a new message: ", message);
  
      users.forEach((sock) => {
        sock.send(message);
      });
    });

    socket.on('close', (socket) => {
      console.log("Lost a connection.");
    });
  });
}



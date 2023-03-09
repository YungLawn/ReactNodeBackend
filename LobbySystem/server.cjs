const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on('message', (data) => {
    console.log(`Received message from client ${socket.id}: ${data}`);
    io.emit('message', { id: socket.id, message: data });
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

server.listen(5173, () => {
  console.log('Server listening on http://localhost:5173');
});

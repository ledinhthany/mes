const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const { Server } = require('socket.io');

const options = {
  key: fs.readFileSync('/path/to/your/ssl/key.pem'),
  cert: fs.readFileSync('/path/to/your/ssl/cert.pem')
};

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: ["https://ledinhthany.github.io", "https://example.com"]
  }
});

// handle connection event
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('user-chat', data => {
    console.log({data})
    io.emit('user-chat', data);
  })
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

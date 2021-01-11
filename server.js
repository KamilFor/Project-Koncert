const express = require('express');
const cors = require('cors');
const http = require('http');
// import socket.io
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

// Endpoint do socket io
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('New socket joined!');
  socket.on('enteringSide', () => {
    console.log('im hearing');
  });
});

app.use('/api/concerts', require('./routers/concerts'));

app.use('/api/seats', require('./routers/seats'));

app.use('/api/testimonials', require('./routers/testimonials'));

app.use((req, res) => {
  res.status(404).send({ message: 'Error 404 not found' });
});

// Server runing
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));

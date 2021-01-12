const express = require('express');
const cors = require('cors');
const http = require('http');
// import socket.io
const socket = require('socket.io');
const mongoose = require('mongoose');

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

app.use('/api/concerts', require('./routers/concerts.routes'));

app.use('/api/seats', require('./routers/seats.routes'));

app.use('/api/', require('./routers/testimonials.routes'));

app.use((req, res) => {
  res.status(404).send({ message: 'Error 404 not found' });
});

// Mongoose Baza danych
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

// Server runing
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));

const express = require('express');
const router = express.Router();

const uuid = require('uuid');

// import models
const Seats = require('../models/seats.models');
// import db
const data = require('../data');
const seats = data.seats;

// Whole array
// GET
exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET ID
exports.getId = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Non found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// POST
exports.postBasic = async (req, res) => {
  req.io.on('seatsUpdated', () => {
    console.log('got it');
  });
  try {
    const { id, day, seat, client, email } = req.body;
    const newSeat = new Seatsy({ id: id, day: day, seat: seat, client: client, email: email });
    if (
      seats.some(() => {
        if (newSeat.seat === seats.seat && newSeat.day === seats.day) return true;
        else return false;
      }) === true
    )
      res.status(400).json({ msg: 'Seats is already taken' });
    else {
      seats.push(newSeat);
      res.json(seats);
      await newSeat.save();
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PUT

router.put('/:id', (req, res) => {
  const updPerson = req.body;
  seats.forEach((item) => {
    if (item.id === parseInt(req.params.id)) {
      item.id = uuid.v4();
      item.day = updPerson.day ? updPerson.day : item.day;
      item.seat = updPerson.seat ? updPerson.seat : item.seat;
      item.client = updPerson.client ? updPerson.client : item.client;
      item.email = updPerson.email ? updPerson.email : item.email;

      res.json({ msg: `Member updated ${item.text}` });
    }
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: seats.filter((item) => item.id !== parseInt(req.params.id)) });
});

// module.exports = router;

/*
GET ALL
router.get('/', (req, res) => {
  // Zwraca cala tablice wpisow
  res.json(seats);
});

GET ID
// ID okreslone przez kogos
router.get('/:id', (req, res) => {
  const exist = seats.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(seats.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

// POST
router.post('/', (req, res) => {
  const newSeat = {
    id: uuid.v4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };

  if (
    seats.some(() => {
      if (newSeat.seat === seats.seat && newSeat.day === seats.day) return true;
      else return false;
    }) === true
  )
    res.status(400).json({ msg: 'Seats is already taken' });
  else {
    seats.push(newSeat);
    res.json(seats);
    req.io.broadcast.emit('seatsUpdated', seats);
  }
});

// PUT
router.put('/:id', (req, res) => {
  const updPerson = req.body;
  seats.forEach((item) => {
    if (item.id === parseInt(req.params.id)) {
      item.id = uuid.v4();
      item.day = updPerson.day ? updPerson.day : item.day;
      item.seat = updPerson.seat ? updPerson.seat : item.seat;
      item.client = updPerson.client ? updPerson.client : item.client;
      item.email = updPerson.email ? updPerson.email : item.email;

      res.json({ msg: `Member updated ${item.text}` });
    }
  });
});

*/

/*
GET ALL
router.get('/', async (req, res) => {
  try {
    res.json(await Seats.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

GET ID
router.get('/:id', (req, res) => {
  const exist = seats.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(seats.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

// POST 
router.post('/', (req, res) => {
  const newSeat = {
    id: uuid.v4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
});



*/

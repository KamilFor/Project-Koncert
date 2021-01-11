const express = require('express');
const router = express.Router();

const uuid = require('uuid');

// import db
const data = require('../data');
const seats = data.seats;

// Whole array
router.get('/', (req, res) => {
  // Zwraca cala tablice wpisow
  res.json(seats);
});

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
  console.log(req.body);
  const newSeat = {
    id: uuid.v4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  console.log(newSeat);

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
    console.log(seats);
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

// DELETE
router.delete('/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: seats.filter((item) => item.id !== parseInt(req.params.id)) });
});

module.exports = router;

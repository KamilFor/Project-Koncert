const express = require('express');
const router = express.Router();

const uuid = require('uuid');

// import db
const data = require('../data');
const concerts = data.concerts;

// Whole array
router.get('/', (req, res) => {
  // Zwraca cala tablice wpisow
  res.json(concerts);
});

// ID okreslone przez kogos
router.get('/:id', (req, res) => {
  const exist = concerts.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(concerts.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

// POST
router.post('/', (req, res) => {
  const newConcert = {
    id: uuid.v4(),
    performer: 'Kamil',
    genre: 'Something smart',
    price: 120942321312,
    day: 365,
    image: 'imagine',
  };

  concerts.push(newConcert);
  res.json(concerts);
});

// PUT
router.put('/:id', (req, res) => {
  const updPerson = req.body;
  concerts.forEach((item) => {
    if (item.id === parseInt(req.params.id)) {
      item.id = uuid.v4();
      item.performer = updPerson.performer ? updPerson.performer : item.performer;
      item.genre = updPerson.genre ? updPerson.genre : item.genre;
      item.price = updPerson.price ? updPerson.price : item.price;
      item.day = updPerson.day ? updPerson.day : item.day;
      item.image = updPerson.image ? updPerson.image : item.image;

      res.json({ msg: `Member updated ${item.text}` });
    }
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: concerts.filter((item) => item.id !== parseInt(req.params.id)) });
});

module.exports = router;

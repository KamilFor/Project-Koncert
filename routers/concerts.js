const express = require('express');
const router = express.Router();

const uuid = require('uuid');

const Concerts = require('../models/concerts.model');

// import db
const data = require('../data');
const concerts = data.concerts;

//GET ALL
exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET ID
exports.getId = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Non found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// POST
exports.postBasic = async (req, res) => {
  try {
    const { id, day, seat, client, email } = req.body;
    const newConcert = new Concerts({ id: id, day: day, seat: seat, client: client, email: email });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PUT
exports.putId = async (req, res) => {
  const { id, day, seat, client, email } = req.body;
  try {
    await Concerts.updateOne({ _id: req.params.id }, { $set: { id: id, day: day, seat, client, email } });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// DELETE
exports.deleteId = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if (concert) {
      await Concerts.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/*
GET ALL
router.get('/', (req, res) => {
  // Zwraca cala tablice wpisow
  res.json(concerts);
});

GET ID
router.get('/:id', (req, res) => {
  const exist = concerts.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(concerts.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

POST
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

PUT
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

DELETE
router.delete('/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: concerts.filter((item) => item.id !== parseInt(req.params.id)) });
});

*/

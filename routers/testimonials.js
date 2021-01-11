const express = require('express');
const router = express.Router();

const uuid = require('uuid');

// import db
const db = require('../db');

router.get('/testimonials', (req, res) => {
  // Zwraca cala tablice wpisow
  res.json(db);
});

// Random id
router.get('/testimonials/random', (req, res) => {
  let randomId = Math.floor(Math.random() * 9); // To da liczbe od 0 do 8
  console.log(db);

  const exist = db.some((item) => item.id === randomId);

  if (exist) {
    res.json(db.filter((item) => item.id === randomId));
  } else {
    res.status(400).json({ msg: `no matching members of id ${randomId}` });
  }
});

// ID okreslone przez kogos
router.get('/testimonials/:id', (req, res) => {
  const exist = db.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(db.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

// POST
router.post('/testimonials', (req, res) => {
  const newPerson = {
    id: uuid.v4(),
    author: 'Kamil',
    text: 'Something smart',
  };

  db.push(newPerson);
  res.json(db);
});

// PUT
router.put('/testimonials/:id', (req, res) => {
  const updPerson = req.body;
  db.forEach((item) => {
    if (item.id === parseInt(req.params.id)) {
      item.id = uuid.v4();
      item.author = updPerson.author ? updPerson.author : item.author;
      console.log(updPerson);
      item.text = updPerson.text ? updPerson.text : item.text;

      res.json({ msg: `Member updated ${item.text}` });
    }
  });
});

// DELETE
router.delete('/testimonials/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: db.filter((item) => item.id !== parseInt(req.params.id)) });
});

router.use('/', (req, res) => {
  res.status(404).json('Non found ..');
});

module.exports = router;

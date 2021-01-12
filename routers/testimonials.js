const express = require('express');
const router = express.Router();

const Testimonials = require('../models/testimonials.model');

// GET BASIC
exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET RANDOM
exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimon = await Testimonials.findOne().skip(rand);
    if (!testimon) res.status(404).json({ message: 'Non found' });
    else res.json(testimon);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// ID
exports.getId = async (req, res) => {
  try {
    const testimon = await Testimonials.findById(req.params.id);
    if (!testimon) res.status(404).json({ message: 'Not found' });
    else res.json(testimon);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// POST
exports.postBasic = async (req, res) => {
  try {
    const { id, author, text } = req.body;
    const newTestimon = new Testimonials({ id: id, author: author, text: text });
    await newTestimon.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PUT
exports.putId = async (req, res) => {
  const { id, author, text } = req.body;
  try {
    await Testimonials.updateOne({ _id: req.params.id }, { $set: { id: id, author: author, text: text } });
    res.json({ message: 'OK PUT' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// DELETE
exports.deleteId = async (req, res) => {
  try {
    const testimon = await Testimonials.findById(req.params.id);
    if (testimon) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// module.exports = router;

/*
GET

GET RANDOM
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

GET ID
router.get('/testimonials/:id', (req, res) => {
  const exist = db.some((item) => item.id === parseInt(req.params.id));

  if (exist) {
    res.json(db.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no matching members of id ${req.params.id}` });
  }
});

POST 
router.post('/testimonials', (req, res) => {
  const newPerson = {
    id: uuid.v4(),
    author: 'Kamil',
    text: 'Something smart',
  };

  db.push(newPerson);
  res.json(db);
});

 PUT
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

DELETE  
router.delete('/testimonials/:id', (req, res) => {
  res.json({ msg: 'member deleted', item: db.filter((item) => item.id !== parseInt(req.params.id)) });
});

*/

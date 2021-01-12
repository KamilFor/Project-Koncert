const express = require('express');
const router = express.Router();

// import Functions
const SeatsFunctions = require('./seats');

// GET
router.get('/seats', SeatsFunctions.getAll);

// // GET ID
router.get('/seats/:id', SeatsFunctions.getId);

// // POST
router.post('/', SeatsFunctions.postBasic);

// // PUT
// router.put('/:id', SeatsFunctions.putId);

// // DELETE
// router.delete('/:id', SeatsFunctions.deleteId);

module.exports = router;

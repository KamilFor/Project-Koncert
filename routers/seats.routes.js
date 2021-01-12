const express = require('express');
const router = express.Router();

// import Functions
const SeatsFunctions = require('./seats');

// GET
router.get('/seats', SeatsFunctions.getAll);

// // GET ID
router.get('/seats/:id', SeatsFunctions.getId);

// // POST
router.post('/seats', SeatsFunctions.postBasic);

// // PUT
router.put('/seats/:id', SeatsFunctions.putId);

// // DELETE
router.delete('/seats/:id', SeatsFunctions.deleteId);

module.exports = router;

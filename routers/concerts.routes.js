const express = require('express');
const router = express.Router();

// import Functions
const ConcertFunctions = require('./concerts');

// GET
router.get('/concerts', ConcertFunctions.getAll);

// // GET ID
router.get('/concerts/:id', ConcertFunctions.getId);

// // POST
router.post('/concerts', ConcertFunctions.postBasic);

// // PUT
router.put('/concerts/:id', ConcertFunctions.putId);

// // DELETE
router.delete('/concerts/:id', ConcertFunctions.deleteId);

module.exports = router;

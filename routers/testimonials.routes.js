const express = require('express');
const router = express.Router();

// import Functions
const TestimonialsFunctions = require('./testimonials');

// GET
router.get('/testimonials', TestimonialsFunctions.getAll);

// // GET RANDOM ID
router.get('/testimonials/random', TestimonialsFunctions.getRandom);

// // GET ID
router.get('/testimonials/:id', TestimonialsFunctions.getId);

// // POST
router.post('/testimonials', TestimonialsFunctions.postBasic);

// //PUT
router.put('/testimonials/:id', TestimonialsFunctions.putId);

// // DELETE
router.delete('/testimonials/:id', TestimonialsFunctions.deleteId);

module.exports = router;

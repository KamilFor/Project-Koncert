const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Testimonials', testimonialsSchema);

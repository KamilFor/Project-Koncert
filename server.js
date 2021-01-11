const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());
app.use('/api/concerts', require('./routers/concerts'));

app.use('/api/seats', require('./routers/seats'));

app.use('/api/testimonials', require('./routers/testimonials'));

app.listen(8000, () => {
  console.log(' Server is runing on port: 8000');
});

const express = require('express');
const app = express();

require('dotenv').config();

const helmet = require('helmet');
app.use(helmet());

app.disable('x-powered-by');

const PORT = process.env.PORT || 3003;
require('./shownet')(PORT);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes section
app.use('/', require('./routes/Authenticate'));
app.use('/', require('./routes/Booking'));
app.use('/', require('./routes/Dashboard'));
app.use('/', require('./routes/Reports'));
app.use('/', require('./routes/Rooms'));


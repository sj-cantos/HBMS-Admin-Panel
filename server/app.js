const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3003;
require('./shownet')(PORT);

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes section
app.use('/', require('./routes/Login'));


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3003;
const cors = require('cors');
require('./shownet')(PORT);

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

require('dotenv').config();  // load .env variables

// ------------------------- basic security setup -------------------------

const helmet = require('helmet');
app.use(helmet());

app.disable('x-powered-by');

// ------------------------- admin session setup -------------------------

const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStoreConnectionOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

const sessionStore = new MySQLStore(sessionStoreConnectionOptions);

app.use(session({
  secret: 'session_super_secret_string',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: false, // 'none' for production.
    secure: false, // false to enable sending cookings over HTTP, set true if deployed to production with HTTPS.
    httpOnly: true, // cookies cannot be accessed by the client side javascript code.
    maxAge: 60000, // 60 seconds before a session expires.
  }
}));

app.use(passport.authenticate('session'));

sessionStore.onReady().then(() => {
	console.log('MySQLStore ready');
}).catch(error => {
	console.error(error);
});

// ------------------------- serve directory section -------------------------

app.use(express.static('public'));

// ------------------------- json body parsers section ------------------------- 

//app.use(express.json()); // accept 'application/json' (json objects)
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
//app.use(express.urlencoded( { extended: true })); // accept 'x-www-form-urlencoded' (form data)

// ------------------------- routes section -------------------------

app.use('/login', require('./routes/Authenticate'));
app.use('/booking', require('./routes/Booking'));
app.use('/dashboard', require('./routes/Dashboard'));
app.use('/reports', require('./routes/Reports'));
app.use('/rooms', require('./routes/Rooms'));

// ------------------------- start server -------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

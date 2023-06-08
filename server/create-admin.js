require('dotenv').config();

function strHasWhiteSpace(s) {
  return /\s/g.test(s);
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const admin = {
  username: '',
  password: ''
};

readline.question('Enter the admin username : ', name => {
  admin.username = Buffer.from(name, 'utf-8').toString();
  if (strHasWhiteSpace(admin.username)) {
    console.log('white spaces are not allowed in admin usernames');
    readline.close();
  } else {
    readline.question('Enter the admin password : ', password => {
      if (password.length < 8) {
        console.log('admin password should be at least 8 characters or above');
      } else if (strHasWhiteSpace(password)) {
        console.log('white spaces are not allowed in admin passwords');
      } else {
        admin.password = Buffer.from(password, 'utf-8').toString();
        createAdminAccount();
        console.log('A new admin user was added : ', admin);
      }
      readline.close();
    });
  }
});

const crypto = require('crypto');

function createAdminAccount() {
  console.log('connecting to database...');
  const pool = require('./database');

  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(admin.password, salt, 200000, 64, 'sha512', function(err, hashedPassword) {
    if (err) {
      console.error('Error creating hashed password : ', err);
      process.exit();
    } else {
      const sha512HashedBase64String = hashedPassword.toString('base64');
      
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('error getting a connection in the connection pool');
        } else {
          const createAdminUserTable = `create table if not exists admin_users (
            id VARCHAR(30) PRIMARY KEY,
            hash VARCHAR(88)
          )`;
  
          connection.execute(createAdminUserTable, (err) => {
            if (err) {
              connection.close();
              console.error('error creating admin user table');
            } else {
              connection.execute('INSERT INTO `admin_users` (`id`, `hash`) VALUES (?, ?)', [
                admin.username,
                sha512HashedBase64String
              ], (err) => {
                if (err) {
                  console.error('error creating a new admin user : ', err.message);
                } else {
                  console.log('A new admin user was successfully created');
                }
  
                connection.close();
              });
            }
          });
        }
      });
    }
  });
}
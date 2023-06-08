# Configure the template.env

1. Create a copy of the `template.env`.
2. Rename the copy to `.env`.
3. Set the proper values of the `.env` files.

# Test the authentication

Make sure that there is no table named `admin_users` and `sessions` in the database.

1. Run `node create-admin` to create a new admin user, it will also create the `admin_users` table in the first run.

2. Run the server `node app`.

3. Try the `localhost:PORT_NUMBER/booking/test` and it should give a unauthorize access code.

4. Login with `localhost:PORT_NUMBER/login`.

5. Try the `localhost:PORT_NUMBER/booking/test` again and it should greet you.

6. Wait for 60+ seconds for the session to expire.

7. Try the `localhost:PORT_NUMBER/booking/test` and it should again give you unauthorize access code, at this point the session expired.

Increase the session `session.cookie.maxAge` in production at `app.js`.
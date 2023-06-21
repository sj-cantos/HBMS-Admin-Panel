import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input, Button, Text
  } from '@chakra-ui/react'

  //Sample Login componenent
const LogIn = ({setLoggedInUser}) => {
  const [adminUser, setAdminUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = (e) => {
    setFeedback('');

    if (adminUser && password) {
      e.preventDefault();
      fetch('http://localhost:3003/login', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
          username: adminUser,
          password: password
        })
      }).then(response => {
        console.log('response = ', response);
        if (response.status === 200) {
          setFeedback('Login success');
          setLoggedInUser(adminUser);
        } else if (response.status === 401) {
          setFeedback('Login failed, incorrect username or password');
        } else {
          setFeedback('Login failed, internal error occurred');
        }
      }).catch(() => {
        setFeedback('Login failed, try again later');
      });
    }
  }

  return (
    <div>
      <form method='post'>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input id='email' type='text' placeholder='Email/Username' required onChange={(e) => setAdminUser(e.target.value)}/>
          <FormLabel>Password</FormLabel>
          <Input id='password' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
          <Input type="submit" value="Login" onClick={handleSubmit}/>
          <Text>{feedback}</Text>
        </FormControl>
      </form>
    </div>
  )
}

export default LogIn
import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input, Button, Text
  } from '@chakra-ui/react'

  //Sample Login componenent
const LogIn = ({handleLogin}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('');

    fetch('/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        username: email,
        password: password
      })
    }).then(response => {
      console.log('response = ', response);
      if (response.status === 200) {
        setFeedback('Login success');
        handleLogin(email);
      } else if (response.status === 401) {
        setFeedback('Login failed, incorrect username or password');
      } else {
        setFeedback('Login failed, internal error occurred');
      }
    });
  }

  return (
    <div>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input id='email' type='email' placeholder='Email/Username' onChange={(e) => setEmail(e.target.value)}/>
        <FormLabel>Password</FormLabel>
        <Input id='password' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <Input type="submit" value="Login" onClick={handleSubmit}/>
        <Text>{feedback}</Text>
      </FormControl>
    </div>
  )
}

export default LogIn
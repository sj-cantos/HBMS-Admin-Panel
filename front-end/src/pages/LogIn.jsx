import React from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
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
      <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
          onChange={(e)=>{setAdminUser(e.target.value)}}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Button colorScheme="teal" mb={8} onClick={handleSubmit}>
          Log In
        </Button>
      
      </Flex>
    </Flex>
      </form>
    </div>
  )
}

export default LogIn
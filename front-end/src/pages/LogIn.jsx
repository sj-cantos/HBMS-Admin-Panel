import React from 'react';
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
  Text, Image, Stack
} from '@chakra-ui/react';
import logo from "../assets/logo.png"

// Sample Login component
const LogIn = ({ setLoggedInUser }) => {
  const [adminUser, setAdminUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('');
    setError('');

    if (!adminUser || !password) {
      setError('Please fill in all the fields.');
      return;
    }

    fetch('http://localhost:3003/login', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        username: adminUser,
        password: password,
      }),
    })
      .then((response) => {
        console.log('response = ', response);
        if (response.status === 200) {
          setFeedback('Login success');
          setLoggedInUser(adminUser);
        } else if (response.status === 401) {
          setError('Login failed, incorrect username or password');
        } else {
          setError('Login failed, internal error occurred');
        }
      })
      .catch(() => {
        setError('Login failed, try again later');
      });
  };

  return (
    <>
      <form method="post">
        <Stack h="100vh" alignItems="center" justifyContent="center">
        <Flex justifyContent="center" ml="-40px" >
              <Image
                width="300px"
                height="150px"
                src={logo}
                
              />
            </Flex>
          <Flex
            flexDirection="column"
            p={12}
            borderRadius={8}
            boxShadow="lg"
            width={500}
            bgColor="white"

          >
            
            <Flex  justifyContent="center">
            <Stack >
            
            <Heading mb={2} color="teal">
              Welcome Back!
            </Heading>
            
            <Text color="gray.500" mb={4} ml="45px">Log in as administrator</Text></Stack></Flex>
            <Input
              placeholder="admin@gmail.com"
              type="email"
              variant="filled"
              mb={3}
              onChange={(e) => {
                setAdminUser(e.target.value);
              }}
            />
            <Input
              placeholder="Enter Password"
              type="password"
              variant="filled"
              mb={6}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button colorScheme="teal" mb={8} onClick={handleSubmit}>
              Log In
            </Button>
            {feedback && <Text color="green">{feedback}</Text>}
            {error && <Text color="red">{error}</Text>}
          </Flex>
        </Stack>
      </form>
    </>
  );
};

export default LogIn;

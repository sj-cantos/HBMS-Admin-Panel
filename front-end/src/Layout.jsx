import React from 'react'
import Sidebar from './components/Sidebar'
import { Flex, Text, IconButton, Box } from '@chakra-ui/react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Analytics from './pages/Analytics'
import { useState } from 'react'
import LogIn from './pages/LogIn'


const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  React.useEffect(() => {
    fetch('http://localhost:3003/login/check', {
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          setLoggedIn(true);
          setUser(data.user);
        }).catch(() => {
          setLoggedIn(false);
        })
      } else {
        setLoggedIn(false);
      }
    }).catch(() => setLoggedIn(false));
  }, []);

  const setLoggedInUser = (loggedInUser) => {
    setLoggedIn(true);
    setUser(loggedInUser);
  };
  
  const [navSize, changeNavSize] = useState("large")
  return (
    <Box bg="white.300">
        <BrowserRouter>
        {loggedIn ? (
            <Flex w="100%" >
              <Sidebar admin={user} />
              <Flex ml={navSize === "small" ? "20px" : "40px"}  mt="20px"flex={1} mr="20px" style={{ overflowX: 'auto' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </Flex>
            </Flex>
          ) : (
            <LogIn setLoggedInUser={setLoggedInUser} />
          )}
        </BrowserRouter>
    </Box>
  )
}

export default Layout
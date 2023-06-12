import React from 'react'
import Sidebar from './components/Sidebar'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Analytics from './pages/Analytics'
import { useState } from 'react'
import LogIn from './pages/LogIn'


const Layout = () => {

  //set the login state temporarily to false in order to view the login page
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState('');

  const handleLogin = (loggedInUser) => {
    // Perform login authentication here (e.g., API call)
    // If login is successful, set loggedIn state to true
    setLoggedIn(true);
    setUser(loggedInUser);
    
  };
  const [navSize, changeNavSize] = useState("large")
  return (
    <div>
        <BrowserRouter>
        {loggedIn ? (
            <Flex w="100%" >
              <Sidebar admin={user} />
              <Flex ml={navSize === "small" ? "20px" : "40px"} mt="20px"flex={1}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </Flex>
            </Flex>
          ) : (
            <LogIn handleLogin={handleLogin} />
          )}
        </BrowserRouter>
    </div>
  )
}

export default Layout
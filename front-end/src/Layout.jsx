import React from 'react'
import Sidebar from './components/sidebar'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Analytics from './pages/Analytics'

const Layout = () => {
  return (
    <div>
        <BrowserRouter>
            <Flex w="100%">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings/>} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/analytics" element={<Analytics />} />
        </Routes>
            </Flex>
        </BrowserRouter>
    </div>
  )
}

export default Layout
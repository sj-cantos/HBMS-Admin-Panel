import React from 'react'
import Sidebar from '../components/sidebar'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import Rooms from './Rooms'
import Analytics from './Analytics'
import Bookings from './Bookings'


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
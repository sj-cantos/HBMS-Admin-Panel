import { createContext, useState } from 'react'
import Sidebar from './components/sidebar'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import {BrowserRouter,RouterProvider, createBrowserRouter} from 'react-router-dom'
import Analytics from './components/Analytics'
import Dashboard from './components/Dashboard'
import Rooms from './components/Rooms'
import Bookings from './components/Bookings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '/bookings',
    element: <Bookings/>
  },
  {
    path: '/rooms',
    element: <Rooms/>
  },
  {
    path: '/analytics',
    element: <Analytics/>
  }
])

function App() {


  return (
    <ChakraProvider>
      <RouterProvider router = {router}>
        <Flex w="100%">
          <Sidebar />
          <Flex
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Text>
              <IconButton
                background="none"
                _hover={{ background: 'none' }}
                icon={<FiMenu />}
              />
            </Text>
          </Flex>
        </Flex>
      </RouterProvider>
    </ChakraProvider>
  )
}

export default App

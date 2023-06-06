
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Analytics from './components/Analytics'
import Dashboard from './components/Dashboard'
import Rooms from './components/Rooms'
import Bookings from './components/Bookings'
import Layout from './components/Layout'

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
      <Layout/>
    </ChakraProvider>
  )
}

export default App

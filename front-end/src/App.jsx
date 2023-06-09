
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import LogIn from './pages/LogIn'


function App() {


  return (
    <ChakraProvider>
      <Layout/>
    </ChakraProvider>
  )
}

export default App


import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './Layout'
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#0E2954", // Your primary color
    secondary: "#1F6E8C",
    tertiary: "#2E8A99",
    alternative: "#84A7A1"
  },

});


function App() {


  return (
    <ChakraProvider theme={theme}>
      <Layout/>
    </ChakraProvider>
  )
}

export default App

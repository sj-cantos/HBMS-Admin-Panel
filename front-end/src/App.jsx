
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './Layout'
import { extendTheme,Box } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#0E2954", // Your primary color
    secondary: "#1F6E8C",
    tertiary: "#34A0A4",
    alternative: "#2E8A99"
  },

});


function App() {


  return (
    <ChakraProvider theme={theme}>
    <Box bgColor="#ecf5f5" height="100%">
      <Layout/>
      </Box>
    </ChakraProvider>
  )
}

export default App

import { useState } from 'react'
import Sidebar from './components/sidebar'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import {} from 'react-router-dom'

function App() {


  return (
    <ChakraProvider>
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
    </ChakraProvider>
  )
}

export default App

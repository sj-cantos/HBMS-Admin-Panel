import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input
  } from '@chakra-ui/react'

  //Sample Login componenent
const LogIn = (handleLogin) => {
  return (
    <div>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormLabel>Password</FormLabel>
            <Input type="password"/>
        </FormControl>

    </div>
  )
}

export default LogIn
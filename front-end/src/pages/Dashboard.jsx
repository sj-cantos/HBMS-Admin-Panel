import React from 'react';
import { Stack, Text, Flex, Box } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'

const Dashboard = () => {
  // Example data for check-ins and check-outs
  const checkInCount = 10;
  const checkOutCount = 5;

  return (
    <Box>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Dashboard
      </Text>
      <Flex mt={4} >
      <Stack spacing='4'>
        
          <Box width={"250px"} height={"120px"} bgColor="white" p={4} borderRadius="10" shadow="lg">
 
            <Heading size="md" fontWeight="semibold" color="gray.500"> Bookings Today</Heading>  
            <Text>20</Text>
           
          </Box>
       
      </Stack>
      </Flex>
    </Box>
  );
};

export default Dashboard;

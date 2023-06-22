import React from 'react';
import { Stack, Text, Flex, Box } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'
import { BsBoxArrowInRight, BsBoxArrowInLeft } from 'react-icons/bs';

const Dashboard = () => {
  // Example data for check-ins and check-outs
  const checkInCount = 10;
  const checkOutCount = 5;

  return (
    <Box>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Dashboard
      </Text>
      <Flex mt={4} direction={['column', 'row']} gap="4">
        <Box width="250px"  height="120px" bgColor="white" p={4} borderRadius="10" shadow="lg" mb={[4, 0]}>
          <Heading size="md" fontWeight="semibold" color="gray.500"> Total Bookings</Heading>  
          <Text mt="14px" fontWeight="semibold" fontSize="25px">20</Text>  
        </Box>
        <Box width="250px"  height="120px" bgColor="white" p={4} borderRadius="10" shadow="lg" mb={[4, 0]}>
          <Heading size="md" fontWeight="semibold" color="gray.500"> Total Guests</Heading>  
          <Text mt="14px" fontSize="25px" fontWeight="semibold">20</Text>  
        </Box>
      </Flex>
      <Flex mt={4} direction={['column', 'row']} gap="4">
        
        <Box width="250px" height="120px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">
            <BsBoxArrowInRight/>
            <Box ml = "30px">
              <Heading size="md" fontWeight="semibold" fontSize="20px" color="gray.500"> Check-ins</Heading>  
              <Text mt="14px" fontSize="25px" fontWeight="semibold">20</Text> 
            </Box> 
          </Flex>
        </Box>
        <Box width="250px"  height="120px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Heading size="md" fontWeight="semibold" color="gray.500"> Check-outs</Heading>  
          <Text mt="14px" fontSize="25px" fontWeight="semibold">20</Text>  
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;

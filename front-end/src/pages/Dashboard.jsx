import React from 'react';
import { Stack, Text, Flex, Box,Icon } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'
import { BsBoxArrowInRight, BsBoxArrowInLeft } from 'react-icons/bs';
import { AiFillBook } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";

const Dashboard = () => {
  // Example data for check-ins and check-outs
  const checkInCount = 10;
  const checkOutCount = 5;

  return (
    <Box>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Dashboard
      </Text>
      <Flex mt={6} direction={['column', 'row']} gap="4">
      <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500"> Bookings</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">20</Text> 
            </Box> 
            <Icon as={AiFillBook} boxSize={10} color="teal"  p={1} borderRadius="10" ml="79px"/> 
          </Flex>
        </Box>
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500">Guests</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">20</Text> 
            </Box> 
            <Icon as={BsFillPeopleFill} boxSize={10} color="teal"  p={1} borderRadius="10" ml="100px"/> 
          </Flex>
        </Box>
      </Flex>
      <Flex mt={6} direction={['column', 'row']} gap="4">
        
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500"> Check-ins</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">20</Text> 
            </Box> 
            <Icon as={BsBoxArrowInRight} boxSize={10} color="teal"  p={1} borderRadius="10" ml="70px"/> 
          </Flex>
        </Box>
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "8px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500">Check-outs</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">20</Text> 
            </Box> 
            <Icon as={BsBoxArrowInLeft} boxSize={10} color="teal"  p={1} borderRadius="10" ml="70px"/> 
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;

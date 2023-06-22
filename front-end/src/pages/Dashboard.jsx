import React, { useEffect } from 'react';
import { Stack, Text, Flex, Box,Icon } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'
import { BsBoxArrowInRight, BsBoxArrowInLeft } from 'react-icons/bs';
import { AiFillBook } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from 'axios'
import { useState } from 'react';
import DailyBookingChart from '../components/DailyBookingChart';


const Dashboard = () => {
  // Example data for check-ins and check-outs
  const [widgetData, setWidgetData] = useState({});

  useEffect(()=>{
    const getWidgetData = ()=>{
      axios.get('http://localhost:3003/dashboard/widget')
      .then(response => {setWidgetData(response.data);console.log(response.data)})
      .catch((error) => console.log(error))
    }
    getWidgetData();
  
  }, [])

  return (
    <Box>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Dashboard
      </Text>
      <Text color="teal.800" fontWeight="semibold" mt="5px" position="relative" top="17px">Today's Reports</Text>
      <Flex mt={10} direction='row' gap="5">
      <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
        
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500"> Bookings</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">{widgetData.totalBookings}</Text> 
            </Box> 
            <Icon as={AiFillBook} boxSize={10} color="teal"  p={1} borderRadius="10" ml="79px"/> 
          </Flex>
        </Box>
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500">Guests</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">{widgetData.totalGuests || 0}</Text> 
            </Box> 
            <Icon as={BsFillPeopleFill} boxSize={10} color="teal"  p={1} borderRadius="10" ml="100px"/> 
          </Flex>
        </Box>
      </Flex>
      <Flex mt={7} direction={['column', 'row']} gap="4">
        
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "10px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500"> Check-ins</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">{widgetData.checkIns}</Text> 
            </Box> 
            <Icon as={BsBoxArrowInRight} boxSize={10} color="teal"  p={1} borderRadius="10" ml="70px"/> 
          </Flex>
        </Box>
        <Box width="250px" height="100px" bgColor="white" p={4} borderRadius="10" shadow="lg">
          <Flex alignItems="center">   
            <Box ml = "8px" alignItems="center">
              <Heading  fontWeight="semibold" fontSize="18px" color="gray.500">Check-outs</Heading>  
              <Text mt="5px" fontSize="25px" fontWeight="semibold">{widgetData.checkOuts}</Text> 
            </Box> 
            <Icon as={BsBoxArrowInLeft} boxSize={10} color="teal"  p={1} borderRadius="10" ml="70px"/> 
          </Flex>
        </Box>
        <Box mt="-170px"><DailyBookingChart/></Box>
      </Flex>
      
    </Box>
  );
};

export default Dashboard;

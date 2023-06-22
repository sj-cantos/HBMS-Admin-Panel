import React, { useEffect } from 'react';
import { Stack, Text, Flex, Box,Icon } from '@chakra-ui/react';
import { Heading} from '@chakra-ui/react'
import { BsBoxArrowInRight, BsBoxArrowInLeft } from 'react-icons/bs';
import { AiFillBook } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from 'axios'
import { useState } from 'react';
import DailyBookingChart from '../components/DailyBookingChart';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';



const Dashboard = () => {
  // Example data for check-ins and check-outs
  const [widgetData, setWidgetData] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(()=>{
    const getWidgetData = ()=>{
      axios.get('http://localhost:3003/dashboard/widget')
      .then(response => {setWidgetData(response.data);console.log(response.data)})
      .catch((error) => console.log(error))
    }
    getWidgetData();
  
  }, [])

  useEffect(()=>{
    const getRecentBookings = ()=>{
      axios.get('http://localhost:3003/dashboard/recent-bookings')
      .then(response => {setRecentBookings(response.data);console.log(response.data)})
      .catch((error) => console.log(error))
    }
    getRecentBookings();
  
  }, [])
  const getDate = (datetime) => {
    const date = new Date(datetime);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatDate = date.toLocaleDateString(undefined, options);

    return formatDate;
  };

  return (
    <Box >
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
        <Flex mt="-170px" ml="20px" ><DailyBookingChart/></Flex>
      </Flex>
      <Stack>
        <Text color="teal.800" fontWeight="semibold" mt="5px">Recent Bookings</Text>
        <Box>
        <Table bgColor="white" borderRadius="10px" shadow="lg">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Check in</Th>
            <Th>Check out</Th>
            <Th>No. of Guests</Th>
           
          </Tr>
        </Thead>
        <Tbody>
          {recentBookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.guest_name}</Td>
              <Td>{getDate(booking.check_in_date)}</Td>
              <Td>{getDate(booking.check_out_date)}</Td>
              <Td>{booking.num_guests}</Td>
              {/* Add more cells as needed */}
            </Tr>
          ))}
        </Tbody>
      </Table>
        </Box>
      </Stack>
      
    </Box>
  );
};

export default Dashboard;

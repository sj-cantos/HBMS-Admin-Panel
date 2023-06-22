import React, { useEffect } from 'react';
import { Stack, Text, Flex, Box,Icon } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'
import { BsBoxArrowInRight, BsBoxArrowInLeft } from 'react-icons/bs';
import { AiFillBook } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from 'axios'
import { useState } from 'react';
import Chart from 'react-apexcharts';

const chartData = {
  series: [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
  options: {
    chart: {
      type: 'area',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 0.5,
    },
  },
};


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
      <Flex mt={6} direction={['column', 'row']} gap="4">
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
      <Flex mt={6} direction={['column', 'row']} gap="4">
        
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
        <Chart options={chartData.options} series={chartData.series} type="area" height={300} />
      </Flex>
    </Box>
  );
};

export default Dashboard;

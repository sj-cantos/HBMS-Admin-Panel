import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Text,Box } from '@chakra-ui/react';

const DailyBookingChart = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/dashboard/booking-count');
      setBookingData(response.data);
    } catch (error) {
      console.error('Error retrieving booking data:', error);
    }
  };

  const chartOptions = {
    chart: {
      id: 'booking-chart',
      type: 'area',
      height: 350,
      background: 'white',
      
      
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM',
      },
    },
    dataLabels:{
        enabled: false
    },
    colors: ['#00c7b6']
  };

  const chartSeries = [
    {
      name: 'Bookings',
      data: bookingData,
    },
  ];

  return (
    <div>
      <Text color="teal.800" fontWeight="semibold" mb="15px">Daily Bookings</Text>
      <Box borderRadius = "10px" > 
        <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={240}
            width={700}
        />
      </Box>
     
    </div>
  );
};

export default DailyBookingChart;

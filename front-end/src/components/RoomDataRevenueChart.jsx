import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

import { Stack,Text, Box } from '@chakra-ui/react';

const RoomDataRevenueChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/reports/rooms-revenue-data');
      if (response.data && response.data.length > 0) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error('Error retrieving room revenue data:', error);
    }
  };

  const chartOptions = {
    xaxis: {
      categories: chartData.map((data) => data.room_type),
    },
  
    colors: ["#0084ff", "#00b8d9", "#00c7b6", "#00e396", "#0acf97"],
    legend: {
      show: false,
    },
    chart: {
      type: 'bar',
      height: 300,
      background: "white"
    },
  };

  return (
    <>
    <Stack>
      <Text
          color="teal.800"
          fontWeight="semibold"
          mt="5px"
         
        >
          Total Revenue per Room Type
        </Text>
        <Box shadow="lg" borderRadius="20px" bgColor="white">
      {chartData.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={[{ data: chartData.map((data) => data.revenue) }]}
          type="bar"
          height={300}
        />
      ) : (
        <p>Loading revenue data...</p>
      )}</Box>
      </Stack>
    </>
  );
};

export default RoomDataRevenueChart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const PopularRoomChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchPopularRoomsData();
  }, []);

  const fetchPopularRoomsData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/dashboard/popular-rooms');
      if (response.data && response.data.length > 0) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error('Error retrieving popular rooms data:', error);
    }
  };

  const chartOptions = {
    labels: chartData.map((data) => data.name),
    series: chartData.map((data) => data.value),
    colors: ['#0084ff', '#00b8d9', '#00c7b6', '#00e396', '#0acf97'],
    legend: {
      show: true,
    },
  };

  return (
    <div>
      {chartData.length > 0 ? (
        <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" height={400} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PopularRoomChart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

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
    yaxis: {
      title: {
        text: 'Revenue',
      },
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
    <div>
      <h1>Room Revenue Data</h1>
      {chartData.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={[{ data: chartData.map((data) => data.revenue) }]}
          type="bar"
          height={300}
        />
      ) : (
        <p>Loading revenue data...</p>
      )}
    </div>
  );
};

export default RoomDataRevenueChart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Stack,Text, Box } from "@chakra-ui/react";

const StatusBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/reports/status-data"
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: true,
      },
      background: "white",
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM",
      },
      categories: chartData.map((data) => data.date),
    },

    series: [
      {
        name: "Check-ins",
        data: chartData.map((data) => data.check_ins),
      },
      {
        name: "Check-outs",
        data: chartData.map((data) => data.check_outs),
      },
    ],
  };

  return (
    <>
      <Stack>
        <Text color="teal.800" fontWeight="semibold" mt="5px">
          Daily Check-in and Check-out
        </Text>
        <Box shadow="lg" borderRadius="20px" bgColor="white">
        {chartData.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={320}
            width={520}
          />
        ) : (
          <p>Loading chart data...</p>
        )}</Box>
      </Stack>
    </>
  );
};

export default StatusBarChart;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Stack,Text } from "@chakra-ui/react";

const RevenueReport = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/reports/weekly-revenue"
        );
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching weekly revenue:", error);
      }
    };

    fetchData();
  }, []);

  const data = chartData.map((row) => ({
    x: row.week_number,
    y: row.revenue,
  }));

  const options = {
    chart: {
      id: "weekly revenue",
      type: "area",
      height: 350,
      background: "white",
    },
    xaxis: {
      type: "text",
      
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00c7b6"],
  };

  const series = [
    {
      name: "Revenue",
      data: data,
    },
  ];

  return (
    <>
      <Stack>
        <Text
          color="teal.800"
          fontWeight="semibold"
          mt="5px"
         
        >
          Weekly Revenue
        </Text>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={250}
          width={500}
        />
      </Stack>
    </>
  );
};

export default RevenueReport;

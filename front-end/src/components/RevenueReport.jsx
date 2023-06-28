import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RevenueReport = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/reports/weekly-revenue");
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching weekly revenue:", error);
      }
    };

    fetchData();
  }, []);

  const data = chartData.map((row) => ({
    x: new Date(row.week_start_date).getTime(),
    y: row.revenue,
  }));

  const options = {
    chart: {
      id: "booking-chart",
      type: "area",
      height: 350,
      background: "white",
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM",
      },
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
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={400}
      />
    </>
  );
};

export default RevenueReport;

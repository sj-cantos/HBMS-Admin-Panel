import React from "react";
import { Text, Box, Stack, Flex } from "@chakra-ui/react";
import RevenueReport from "../components/RevenueReport";
import StatusBarChart from "../components/StatusBarChart";
import RoomDataRevenueChart from "../components/RoomDataRevenueChart";
const Analytics = () => {
  return (
    <>
      <Box>
        <Text color="teal.900" fontSize="35px" fontWeight="normal" pl={10}>
          ANALYTICS
        </Text>
        <Flex gap={10} pl={10}>
          <Box >
            <RevenueReport />
          </Box>
          <Box >
            <StatusBarChart />
          </Box>
        </Flex>
        <Box pl={10}>
          <RoomDataRevenueChart />
        </Box>
      </Box>
    </>
  );
};

export default Analytics;

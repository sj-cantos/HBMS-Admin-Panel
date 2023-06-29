import React from "react";
import { Text, Box, Stack } from "@chakra-ui/react";
import RevenueReport from "../components/RevenueReport";
import StatusBarChart from "../components/StatusBarChart";
const Analytics = () => {
  return (
    <>
      <Box>
        <Stack>
          <Text color="teal.900" fontSize="35px" fontWeight="normal">
            Analytics
          </Text>
          <Box>
            <RevenueReport />
          </Box>
        </Stack>
        <StatusBarChart/>

      </Box>
    </>
  );
};

export default Analytics;

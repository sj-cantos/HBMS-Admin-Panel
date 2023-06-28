import React from "react";
import { Text ,Box,Stack} from "@chakra-ui/react";
import RevenueReport from "../components/RevenueReport";

const Analytics = () => {



  return (
    <>
    <Stack>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Analytics
      </Text>
      <Box>
        <RevenueReport/>
      </Box>
    </Stack>
    </>
  );
};

export default Analytics;

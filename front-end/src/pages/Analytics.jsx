import React from "react";
import { Text ,Box} from "@chakra-ui/react";
import RevenueReport from "../components/RevenueReport";

const Analytics = () => {



  return (
    <>
      <Text color="teal.900" fontSize="35px" fontWeight="normal">
        Analytics
      </Text>
      <Box>
        <RevenueReport/>
      </Box>

    </>
  );
};

export default Analytics;

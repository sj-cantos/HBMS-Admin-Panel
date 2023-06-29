import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";

export default function NavItem({ icon, title, active, navSize, to }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          as={ReactRouterLink}
          to={to}
          p={3}
          borderRadius={8}
          _hover={{
            textDecoration: "none",
            backgroundColor: "teal",
          }}
          w={navSize == "large" && "100%"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color= {isHovered ? "white" : "teal"} />
              <Text
                fontWeight="medium"
                color={isHovered ? "white" : "teal"}
                ml={5}
                display={navSize == "small" ? "none" : "flex"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}

import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button, Box, HStack
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiPieChart,
  FiLogOut,
} from "react-icons/fi";

import NavItem from "../components/NavItem";
import logo from "../assets/hotellogo.png"


const Sidebar = ({ admin, navSize, changeNavSize, handleLogOut }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Perform delete action
    // ...
    handleLogOut();
    handleDeleteClose();
  };

  return (
    <Flex
      pos="sticky"
      top="0"
      left="0"
      h="100vh"
      marginTop="0vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRightRadius="10px"
      w={navSize == "small" ? "75px" : "230px"}
      flexDir="column"
      justifyContent="space-between"
      transition="width 0.3s ease"
      bgColor="white"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <HStack>
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          color="teal"
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        
      </HStack>

        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" to={"/"} />
        <NavItem
          navSize={navSize}
          icon={FiCalendar}
          title="Bookings"
          to={"/bookings"}
        />
        <NavItem navSize={navSize} icon={FiUser} title="Rooms" to={"/rooms"} />
        <NavItem
          navSize={navSize}
          icon={FiPieChart}
          title="Analytics"
          to={"/analytics"}
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm" color="teal">
              Admin
            </Heading>
            <Flex>
              <Text fontWeight="normal" color="teal">
                {admin ? admin : "none"}
              </Text>
              <Flex ml="60px" mt="-20px">
                <IconButton
                  icon={<FiLogOut />}
                  color="teal"
                  background="none"
                  onClick={handleDeleteOpen}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isDeleteOpen} onClose={handleDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Log out</ModalHeader>
          <ModalBody>
            Are you sure you want to log out?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleDeleteConfirm}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Sidebar;

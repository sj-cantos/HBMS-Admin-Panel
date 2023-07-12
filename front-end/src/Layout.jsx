import React from "react";
import Sidebar from "./components/Sidebar";
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
  Button, Box, HStack,Icon
} from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Analytics from "./pages/Analytics";
import { useState } from "react";
import LogIn from "./pages/LogIn";
import axios from "axios";
import { FiUser } from "react-icons/fi";
const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  React.useEffect(() => {
    fetch("http://localhost:3003/login/check", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              setLoggedIn(true);
              setUser(data.user);
            })
            .catch(() => {
              setLoggedIn(false);
            });
        } else {
          setLoggedIn(false);
        }
      })
      .catch(() => setLoggedIn(false));
  }, []);

  const setLoggedInUser = (loggedInUser) => {
    setLoggedIn(true);
    setUser(loggedInUser);
  };
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

  const handleLogOut = async () =>{
    
    //   try {
    //     const response = await axios.delete("http://localhost:3003/login/signout");
    //     console.log(response.data);
    //     // Perform any additional actions after successful logout
    //   } catch (error) {
    //     console.error(error);
    //     // Handle error
    //   }
    
    // try {
    //   console.log('logout call');
    //   const response = await fetch('http://localhost:3003/login/signout', {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'text/plain'
    //     },
    //     method: 'delete'
    //   });

    //   const res = await response.json();
    //   console.log('handleLogOut = ', res);
    // } catch (err) {
    //   console.log(err);
    // }    

    fetch("http://localhost:3003/login/signout", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        'Content-Type': 'text/plain'
      },
      method: 'delete'
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              setLoggedIn(false);
              console.log('logout data = ', data.user);
              setUser(null);
            })
            .catch(() => {
              setLoggedIn(true);
            });
        } else {
          setLoggedIn(true);
        }
      })
      .catch(() => setLoggedIn(true));
  }

  const [navSize, changeNavSize] = useState("large");
  return (
    <Box >
      <BrowserRouter>
        {loggedIn ? (
          <Flex w="100%">
            <Sidebar
              admin={user}
              navSize={navSize}
              changeNavSize={changeNavSize}
              handleLogOut={handleLogOut}
            />
            <Box position="fixed" top="6" right="50" zIndex="1000">
              
              <Button leftIcon={<FiUser/>} colorScheme="teal" variant="solid" onClick={handleDeleteOpen} >
               
                Log Out
                </Button>
                
            </Box>
            <Flex
              pl={navSize === "small" ? "40px" : "20px"}
              mt="20px"
              flex={1}
              mr="20px"
              style={{ overflowX: "auto" }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Flex>
          </Flex>
        ) : (
          <LogIn setLoggedInUser={setLoggedInUser} />
        )}
      </BrowserRouter>
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
    </Box>
  );
};

export default Layout;

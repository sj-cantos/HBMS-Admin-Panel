import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  useToast,
  Textarea,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";

const EditBookingModal = ({
  isOpen,
  onClose,
  bookingId,
  bookingData,
  setBookingData,
}) => {
  const [updatedBookingData, setUpdatedBookingData] = useState(null);
  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    const booking = bookingData.find((booking) => booking.id === bookingId);

    setUpdatedBookingData(booking);
    //setUpdatedBookingData(booking);
    return () => {};
  }, [bookingId, bookingData]);

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBookingData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    const getRooms = () => {
      axios
        .get("http://localhost:3003/rooms")
        .then((response) => setRoomsData(response.data))
        .catch((error) => console.log(error));
    };
    getRooms();
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3003/booking/${bookingId}`, updatedBookingData)
      .then((response) => {
        console.log(response.data);
        // Call the onSubmit function passed as prop to handle the updated data

        setBookingData((prevData) => {
          const updatedData = prevData.map((booking) => {
            if (booking.id === bookingId) {
              return { ...booking, ...updatedBookingData };
            }
            return booking;
          });
          return updatedData;
        });
        toast({
          title: "Update success",
          description: "Updated booking details successfully.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.log(error);
        // Display an error toast message
        toast({
          title: "Error",
          description: "Failed to update booking.",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      });
    console.log(updatedBookingData);
  };

  if (!updatedBookingData) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Stack spacing={2}>
              <FormLabel>Guest Name</FormLabel>
              <Input
                name="guest_name"
                value={updatedBookingData.guest_name}
                onChange={handleInputChange}
              />
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={updatedBookingData.email}
                onChange={handleInputChange}
              />
              <FormLabel>Room Type</FormLabel>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  textAlign="left"
                >
                  {updatedBookingData.room_type}
                </MenuButton>
                <MenuList>
                  {roomsData.map((room) => (
                    <MenuItem
                      key={room.id}
                      onClick={() => {
                        setUpdatedBookingData((prevData) => ({
                          ...prevData,
                          room_type: room.name,
                        }));
                      }}
                    >
                      {room.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <FormLabel>Book Date</FormLabel>
              <Input
                name="booking_date"
                type="date"
                value={
                  updatedBookingData
                    ? formatDate(updatedBookingData.booking_date)
                    : ""
                }
                onChange={(e) => {
                  setUpdatedBookingData((prevData) => ({
                    ...prevData,
                    booking_date: formatDate(e.target.value),
                  }));
                }}
              />
              <FormLabel>Check in</FormLabel>
              <Input
                type="date"
                name="check_in_date"
                value={
                  updatedBookingData
                    ? formatDate(updatedBookingData.check_in_date)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedBookingData((prevData) => ({
                    ...prevData,
                    check_in_date: formatDate(e.target.value),
                  }))
                }
              />
              <FormLabel>Check out</FormLabel>
              <Input
                type="date"
                name="check_out_date"
                value={
                  updatedBookingData
                    ? formatDate(updatedBookingData.check_out_date)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedBookingData((prevData) => ({
                    ...prevData,
                    check_out_date: formatDate(e.target.value),
                  }))
                }
              />
              <FormLabel>Number of guests</FormLabel>
              <Input
                type="number"
                name="num_guests"
                value={updatedBookingData.num_guests}
                onChange={handleInputChange}
              />
              <FormLabel>Status</FormLabel>
              <RadioGroup
                name="status_name"
                value={updatedBookingData.status_name}
                onChange={(value) =>
                  setUpdatedBookingData((prevData) => ({
                    ...prevData,
                    status_name: value,
                  }))
                }
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="yellow" value="Pending">
                    Pending
                  </Radio>
                  <Radio colorScheme="green" value="Checked-in">
                    Checked-in
                  </Radio>
                  <Radio colorScheme="orange" value="Checked-out">
                    Checked-out
                  </Radio>
                  <Radio colorScheme="orange" value="Cancelled">
                    Cancelled
                  </Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBookingModal;

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  MenuItem,
  FormErrorMessage,
} from '@chakra-ui/react';
import axios from 'axios';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';

const AddBookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newBookData, setNewBookData] = useState({});
  const [roomsData, setRoomsData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setNewBookData({});
    setIsOpen(false);
  };

  const handleSave = () => {
    const { name, email, room_type, book_date, check_in_date, check_out_date, num_guests, status } = newBookData;

    // Check if any required field is empty
    const errors = {};
    if (!name) errors.name = 'Guest Name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!room_type) errors.room_type = 'Room Type is required.';
    if (!book_date) errors.book_date = 'Book Date is required.';
    if (!check_in_date) errors.check_in_date = 'Check-in Date is required.';
    if (!check_out_date) errors.check_out_date = 'Check-out Date is required.';
    if (!num_guests) errors.num_guests = 'Number of guests is required.';
    if (!status) errors.status = 'Status is required.';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
       
      return;
    }

   console.log(newBookData);
  };

  const handleSelect = (value) => {

    setSelectedValue(value);
    setNewBookData({...newBookData, room_type: selectedValue})
  };

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const getRooms = () => {
      axios
        .get('http://localhost:3003/rooms')
        .then((response) => setRoomsData(response.data))
        .catch((error) => console.log(error));
    };
    getRooms();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} variant="solid" bg="tertiary" color="white" w="70px">
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
            <FormControl isRequired isInvalid={Boolean(formErrors.name)}>
              
                <FormLabel>Guest Name</FormLabel>
                <Input
                  placeholder="Guest Name"
                  onChange={(e) => setNewBookData({ ...newBookData, name: e.target.value })}
                  type="text"
                  isRequired
                />
                <FormErrorMessage>{formErrors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={Boolean(formErrors.email)}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  onChange={(e) => setNewBookData({ ...newBookData, email: e.target.value })}
                  type="text"
                  isRequired
                />
                {formErrors.email && <FormErrorMessage>{formErrors.email}</FormErrorMessage>}
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(formErrors.room_type)}>
                <FormLabel>Room Type</FormLabel>
                <Flex>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="250px">
                      Select Room Type
                    </MenuButton>
                    <MenuList>
                      {roomsData.map((roomtype) => (
                        <MenuItem key={roomtype.id} onClick={() => handleSelect(roomtype.name)}>
                          {roomtype.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  <Input
                    ml="5px"
                    value={selectedValue}
                    placeholder="Selected Room Type"
                    isReadOnly
                    onChange={(e) => setNewBookData({ ...newBookData, room_type: e.target.value })}
                    isRequired
                  />
                </Flex>
                {formErrors.room_type && <FormErrorMessage>{formErrors.room_type}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.book_date)}>
                <FormLabel>Book Date</FormLabel>
                <Input
                  onChange={(e) => setNewBookData({ ...newBookData, book_date: e.target.value })}
                  type="date"
                  isRequired
                />
                {formErrors.book_date && <FormErrorMessage>{formErrors.book_date}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.check_in_date)}>
                <FormLabel>Check-in Date</FormLabel>
                <Input
                  onChange={(e) => setNewBookData({ ...newBookData, check_in_date: e.target.value })}
                  type="date"
                  isRequired
                />
                {formErrors.check_in_date && (
                  <FormErrorMessage>{formErrors.check_in_date}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.check_out_date)}>
                <FormLabel>Check-out Date</FormLabel>
                <Input
                  onChange={(e) => setNewBookData({ ...newBookData, check_out_date: e.target.value })}
                  type="date"
                  isRequired
                />
                {formErrors.check_out_date && (
                  <FormErrorMessage>{formErrors.check_out_date}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.num_guests)}>
                <FormLabel>Number of guests</FormLabel>
                <Input
                  placeholder="Number of Guests"
                  onChange={(e) => setNewBookData({ ...newBookData, num_guests: e.target.value })}
                  type="number"
                  isRequired
                />
                {formErrors.num_guests && (
                  <FormErrorMessage>{formErrors.num_guests}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.name)}>
                <FormLabel>Status</FormLabel>
                <RadioGroup>
                  <Stack spacing={5} direction="row" value={selectedStatus} onClick={(e) => setNewBookData({ ...newBookData, status: e.target.value })}>
                    <Radio colorScheme="yellow" value="Pending">
                      Pending
                    </Radio>
                    <Radio colorScheme="green" value="Checked-in">
                      Checked-in
                    </Radio>
                    <Radio colorScheme="orange" value="Checked-out">
                      Checked-out
                    </Radio>
                  </Stack>
                </RadioGroup>
                {formErrors.status && <FormErrorMessage>{formErrors.status}</FormErrorMessage>}
              </FormControl>
              </Stack>
            
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSave} type='submit'>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddBookingModal;

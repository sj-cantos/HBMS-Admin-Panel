import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,Flex, ModalBody, ModalCloseButton,Textarea, Button, FormControl, FormLabel, Input, Stack, useToast, MenuItem } from '@chakra-ui/react';
import axios from 'axios';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react'
const AddBookingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newBookData, setNewBookData] = useState({});
    const [roomsData, setRoomsData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');


    const handleOpen = () => {
        setIsOpen(true);
      };
    
      const handleClose = () => {
        setIsOpen(false);
      };

      const handleSave = ()=> {
        console.log(newBookData)
    
      }
      const handleSelect = (value) => {
        setSelectedValue(value);
      };
    
      const handleInputChange = (event) => {
        setSelectedValue(event.target.value);
      };
    
     

      useEffect(()=>{
        const getRooms = ()=>{
          axios.get('http://localhost:3003/rooms')
          .then(response=> setRoomsData(response.data))
          .catch(error => console.log(error))
        }
        getRooms();
        return () => {
          
        };
      
    
      },[]);
     


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
            <FormControl  >
              <Stack spacing={2}>
                <FormLabel>Guest Name</FormLabel>
                <Input
                  placeholder="Guest Name"
                  onChange={(e) => setNewBookData({ ...newBookData, name: e.target.value })}
                  type="text" isRequired
                />
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  onChange={(e) => setNewBookData({ ...newBookData, email: e.target.value })}
                  type="text" isRequired
                />
                <FormLabel>Room Type</FormLabel>
                <Flex >
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="250px">Select Room Type</MenuButton>
                        <MenuList>
                            {roomsData.map((roomtype)=>(
                                
                                <MenuItem key={roomtype.id} onClick={() => handleSelect(roomtype.name)}>{roomtype.name}</MenuItem>
                            )      
                            )}
                            
                        </MenuList>
                    </Menu>
                    <Input ml="5px"value={selectedValue}  placeholder="Selected Room Type" isReadOnly
                            onChange={(e) => setNewBookData({ ...newBookData, room_type: e.target.value })} isRequired />
                </Flex>
                <FormLabel>Book Date</FormLabel>
                    <Input
                    
                    onChange={(e) => setNewBookData({ ...newBookData, book_date: e.target.value })}
                    type="date" isRequired
                    />
                <FormLabel>Check-in Date</FormLabel>
                    <Input
                   
                    onChange={(e) => setNewBookData({ ...newBookData, check_in_date: e.target.value })}
                    type="date" isRequired
                    />
                <FormLabel>Check-out Date</FormLabel>
                    <Input
                    
                    onChange={(e) => setNewBookData({ ...newBookData, check_out_date: e.target.value })}
                    type="date" isRequired
                    />
                <FormLabel>Number of guests</FormLabel>
                    <Input
                    placeholder="Number of Guests"
                    onChange={(e) => setNewBookData({ ...newBookData, num_guests: e.target.value })}
                    type="number" isRequired
                    />
                <FormLabel>Status</FormLabel>
                    <RadioGroup >
                        <Stack spacing={5} direction='row' value={selectedStatus} onClick={(e)=>setNewBookData({ ...newBookData, status: e.target.value })}>
                            <Radio colorScheme='yellow' value='Pending' >
                                Pending
                            </Radio>
                            <Radio colorScheme='green' value='Checked-in' >
                                Checked-in
                            </Radio>
                            <Radio colorScheme='red' value='Checked-out' >
                                Checked-out
                            </Radio>
                        </Stack>
                    </RadioGroup>              
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default AddBookingModal
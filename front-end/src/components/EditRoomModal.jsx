import React, { useState } from 'react';
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
  Button,Stack,useToast,Textarea
} from '@chakra-ui/react';
import { useEffect } from 'react';

const EditRoomModal = ({ isOpen, onClose, roomData, onSubmit }) => {
    const [updatedRoomData, setUpdatedRoomData] = useState(roomData);
    const toast = useToast();
    useEffect(() => {
        setUpdatedRoomData(roomData);
      }, [roomData]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedRoomData((prevData) => ({ ...prevData, [name]: value }));
    };
    
     
      
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(updatedRoomData).then(data => {console.log(data);
          toast({
            title: "Success",
            description: "Room details edited successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'top'
          }); onClose();
        }).catch((error)=>console.log(error));
        console.log(updatedRoomData)
      };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Stack spacing={2}>
              <Input
                name="name"
                value={updatedRoomData.name}
                onChange={handleInputChange}
              />
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={updatedRoomData.description}
                onChange={handleInputChange}
              />
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                value={updatedRoomData.price}
                onChange={handleInputChange}
              />
              <FormLabel>Amenities</FormLabel>
              <Textarea
                name="amenities"
                value={updatedRoomData.amenities}
                onChange={handleInputChange}
              />
              
              </Stack>
            </FormControl>
            {/* Add more form fields as needed */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  export default EditRoomModal;
  
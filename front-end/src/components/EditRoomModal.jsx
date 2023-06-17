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
  Button,
} from '@chakra-ui/react';

const EditRoomModal = ({ isOpen, onClose, roomData, onSubmit }) => {
    const [updatedRoomData, setUpdatedRoomData] = useState(roomData);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedRoomData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(updatedRoomData);
      console.log(updatedRoomData)
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input
                name="name"
                value={updatedRoomData.name}
                onChange={handleInputChange}
              />
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
  
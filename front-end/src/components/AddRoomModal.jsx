import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,Textarea, Button, FormControl, FormLabel, Input, Stack, useToast, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';

const AddRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [image, setImage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
  };

  const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setImage(reader.result);
    }

}
const handleSave = async (e) => {
  e.preventDefault();
  
  const reqData = {...newRoomData, imageData: image}

    // Check if any required field is empty
    const errors = {};
    if (!reqData.name) errors.name = 'Room Name is required.';
    if (!reqData.description) errors.description = 'Description is required.';
    if (!reqData.price) errors.price = 'Price is required.';
    if (!reqData.amenities) errors.amenities = 'Amenities is required.';
    
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
       
      return;
    }
  try {
    const data = await axios.post('http://localhost:3003/rooms/',reqData)
    console.log(data) 
    toast({
      title: "Success",
      description: "Room details added successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
    handleClose();

  } catch(error){
    console.log(error);
    toast({
      title: 'Error',
      description: 'An error occurred while submitting the room data.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  }
}

  return (
    <div>
      <Button onClick={handleOpen} variant="solid" bg="tertiary" color="white" w="70px">
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Room Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
            <FormControl isRequired isInvalid={Boolean(formErrors.name)} >             
                <FormLabel>Room Name</FormLabel>
                <Input
                  placeholder="Room Name"
                  onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
                  type="text" isRequired
                />
                <FormErrorMessage>{formErrors.name}</FormErrorMessage>
             </FormControl>

             <FormControl isRequired isInvalid={Boolean(formErrors.description)} > 
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  onChange={(e) => setNewRoomData({ ...newRoomData, description: e.target.value })}
                  type="text" isRequired
                />
                <FormErrorMessage>{formErrors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.price)} >
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  onChange={(e) => setNewRoomData({ ...newRoomData, price: e.target.value })}
                  type="number" isRequired
                />
                <FormErrorMessage>{formErrors.price}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={Boolean(formErrors.amenities)} > 
                <FormLabel>Amenities</FormLabel>
                <Textarea
                  placeholder="Amenities"
                  onChange={(e) => setNewRoomData({ ...newRoomData, amenities: e.target.value })}
                  type="text" isRequired
                />
                <FormErrorMessage>{formErrors.amenities}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired > 
                <FormLabel>Image</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageUpload} isRequired />
                
              </FormControl>
                
              </Stack>
           
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddRoomModal;

import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';

const AddRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('');

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
  try {
    const data = await axios.post('localhost:3003/rooms',reqData)
    console.log(data)
  } catch(error){
    console.log(error);
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
            <FormControl>
              <Stack spacing={2}>
                <FormLabel>Room Name</FormLabel>
                <Input
                  placeholder="Room Name"
                  onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
                />
                <FormLabel>Bed Type</FormLabel>
                <Input
                  placeholder="Bed Type"
                  onChange={(e) => setNewRoomData({ ...newRoomData, bedType: e.target.value })}
                />
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  onChange={(e) => setNewRoomData({ ...newRoomData, price: e.target.value })}
                />
                <FormLabel>Amenities</FormLabel>
                <Input
                  placeholder="Amenities"
                  onChange={(e) => setNewRoomData({ ...newRoomData, amenities: e.target.value })}
                />
                <FormLabel>Image</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                
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
  );
};

export default AddRoomModal;

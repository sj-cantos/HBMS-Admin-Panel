import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Image } from 'cloudinary-react';
import { ImageUploader } from 'cloudinary-react';
import axios from 'axios';

const AddRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage); // Use the selected image
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dppn7c2ef/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            upload_preset: 'qvq5juo7', // Replace with your unsigned upload preset name
          },
        }
      );
  
      const publicId = response.data.public_id; 
      const imageUrl = `https://res.cloudinary.com/dppn7c2ef/image/upload/${publicId}`;
      // Send the room data and image URL to the backend
      const roomData = {
        ...newRoomData,
        imageUrl, // Add the image URL to the room data
      };
  
      const backendResponse = await axios.post('http://localhost:3003/rooms/', {
        roomData,
      });
  
      console.log(backendResponse.data);
    } catch (error) {
      console.error('Error saving room data and image:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

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
                  height="100px"
                  onChange={(e) => setNewRoomData({ ...newRoomData, amenities: e.target.value })}
                />
                <FormLabel>Images</FormLabel>
                <ImageUploader
                  cloudName="dppn7c2ef"
                  uploadPreset="qvq5juo7" // Replace with your unsigned upload preset name
                  onChange={handleImageUpload}
                  buttonText="Upload Image"
                />
                {selectedImage && (
                  <Image
                    cloudName="dppn7c2ef"
                    publicId={selectedImage.name}
                    width="100"
                    crop="scale"
                  />
                )}
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddRoomModal;

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
  Button,Stack
} from '@chakra-ui/react';
import { useEffect } from 'react';

const EditRoomModal = ({ isOpen, onClose, roomData, onSubmit }) => {
    const [updatedRoomData, setUpdatedRoomData] = useState(roomData);
    const [updatedRoomImages, setUpdatedRoomImages] = useState([roomData.images]);

    useEffect(() => {
        setUpdatedRoomData(roomData);
      }, [roomData]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedRoomData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const filePromises = files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = (error) => {
              reject(error);
            };
          });
        });
    
        Promise.all(filePromises)
          .then((results) => {
            setUpdatedRoomImages(results);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    
     
  
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(updatedRoomData).then(data => console.log(data)).catch((error)=>console.log(error));
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
              <Stack spacing={2}>
              <Input
                name="name"
                value={updatedRoomData.name}
                onChange={handleInputChange}
              />
              <FormLabel>Bed Type</FormLabel>
              <Input
                name="bed_type"
                value={updatedRoomData.bed_type}
                onChange={handleInputChange}
              />
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                value={updatedRoomData.price}
                onChange={handleInputChange}
              />
              <FormLabel>Amenities</FormLabel>
              <Input
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
  
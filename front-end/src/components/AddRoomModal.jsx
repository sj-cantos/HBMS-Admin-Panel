import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const AddRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    console.log(newRoomData);
    console.log(selectedImages);
    // Perform the necessary actions with the new room data and images
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
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
                <Input type="file" multiple onChange={handleImageChange} />
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

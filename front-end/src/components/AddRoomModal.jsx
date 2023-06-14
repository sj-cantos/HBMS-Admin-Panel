import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input,Stack
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

const AddRoomModal = ({handleAdd}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newRoomData, setNewRoomData] = useState({})

    const handleSave = () => {
        console.log(newRoomData)

    }
    
  return (
    <div>
        <Button onClick={onOpen} variant="solid" bg="tertiary" color="white" w="70px" >Add</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Room Type</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Stack spacing={2}>
                                <FormLabel>Room Name</FormLabel>
                                <Input placeholder="Room Name" onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}/>
                                <FormLabel>Bed Type</FormLabel>
                                <Input placeholder="Bed Type" onChange={(e) => setNewRoomData({ ...newRoomData, bedType: e.target.value })}/>
                                <FormLabel>Price</FormLabel>
                                <Input placeholder="Room Name" onChange={(e) => setNewRoomData({ ...newRoomData, price: e.target.value })}/>
                                <FormLabel>Amenities</FormLabel>
                                <Input placeholder="Amenities" height="100px" onChange={(e) => setNewRoomData({ ...newRoomData, amenities: e.target.value })}/>
                            </Stack>
                        </FormControl>
                    </ModalBody>

                <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick = {handleSave} >
                    Save
                </Button>
                <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AddRoomModal
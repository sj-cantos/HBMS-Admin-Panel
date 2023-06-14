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

const AddRoomModal = ({handleAdd}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                                <Input placeholder="Room Name"/>
                                <FormLabel>Bed Type</FormLabel>
                                <Input placeholder="Bed Type"/>
                                <FormLabel>Price</FormLabel>
                                <Input placeholder="Room Name"/>
                                <FormLabel>Amenities</FormLabel>
                                <Input placeholder="Amenities" height="100px"/>
                            </Stack>
                        </FormControl>
                    </ModalBody>

                <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={onClose}>
                    Save
                </Button>
                <Button variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AddRoomModal
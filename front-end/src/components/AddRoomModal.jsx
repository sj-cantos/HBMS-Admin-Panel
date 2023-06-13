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
import { useDisclosure } from '@chakra-ui/react'

const AddRoomModal = ({handleAdd}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
        <Button onClick={onOpen} >Add</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hello
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AddRoomModal
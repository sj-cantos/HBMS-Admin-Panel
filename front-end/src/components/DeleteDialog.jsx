import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,Button,useToast
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import axios from 'axios'

const DeleteDialog = ({ isOpen, onClose, roomId, onDelete }) => {
    const cancelRef = React.useRef();
    const toast = useToast();

    const confirmDelete = async () => {
        try {
          await axios.delete(`http://localhost:3003/rooms/${roomId}`);
          onDelete(roomId);
          toast({
            title: "Success",
            description: "Room data deleted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
          onClose();
        } catch (error) {
          console.log(error);
          toast({
            title: 'Error',
            description: 'An error occurred while deleting the room data.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      };

  return (
    <div>
    
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default DeleteDialog
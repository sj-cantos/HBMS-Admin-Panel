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

const DeleteDialog = ({ isOpen, onClose, bookId, onDelete }) => {
    const cancelRef = React.useRef();
    const toast = useToast();

    const confirmDelete = async () => {
        try {
          console.log(bookId)
          await axios.delete(`http://localhost:3003/booking/${bookId}`);
          onDelete(bookId);
          toast({
            title: "Success",
            description: "Booking data deleted successfully.",
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
            description: 'An error occurred while deleting the booking data.',
            status: 'error',
            duration: 5000,
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
              Delete Booking
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
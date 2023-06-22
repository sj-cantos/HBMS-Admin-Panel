import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Image,
  Button,
  useDisclosure,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ButtonGroup
} from '@chakra-ui/react';
import { EditIcon, SearchIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import AddBookingModal from '../components/AddBookingModal';
import EditBookingModal from '../components/EditBookingModal';

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookingData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [roomsData, setRoomsData] = useState([]);
  const cancelRef = useRef();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBookingDeleteId, setSelectedBookingDeleteId] = useState(null);
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');


  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/booking/${id}`);
      const updatedBookingData = bookingData.filter((booking) => booking.id !== id);
      setBookingData(updatedBookingData);
      console.log("Deleted booking with ID: " + id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Booking data deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Error",
        description: "Error occured while deleting data",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleDelete = (id) => {
    setSelectedBookingDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    console.log(selectedBookingDeleteId);
  }, [selectedBookingDeleteId]);

  const openEditModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBookingId(null);
    setEditModalOpen(false);
  };

  const onSubmit = async (data, id) => {
    // Handle form submission
  };

  const getPaginatedBookings = (bookings) => {
    const filteredBookings = bookings.filter((booking) =>
    booking.guest_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBookings.slice(startIndex, endIndex);
  };

  const getDate = (datetime) => {
    const date = new Date(datetime);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatDate = date.toLocaleDateString(undefined, options);

    return formatDate;
  };

  useEffect(() => {
    const getBookings = () => {
      axios
        .get('http://localhost:3003/booking',{params:{search:searchQuery}})
        .then((response) => {
          console.log(response.data);
          setBookingData(response.data);
        })
        .catch((error) => console.log(error));
    };
    getBookings();
  }, []);

  const handleDeleteClick = (id) => {
    handleDelete(id);
    setSearchQuery('');
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <Stack minWidth="100%">
      <Text color="teal.900" fontSize="35px" fontWeight="normal">Bookings</Text>
      <Flex justifyContent="space-between" position="relative" top="90px">
        <AddBookingModal />
        <Flex alignItems="center">
          <Input placeholder="Search Bookings" width="500px" colorScheme="white" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}/>
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search"
            ml={2}
            bg="white"
            color="tertiary"
            borderColor="tertiary"
            variant="outline"
          />
        </Flex>
      </Flex>

      <TableContainer borderRadius="10px" mt="100px" boxShadow="lg">
        <Table size="md" bg="white">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Guest Name</Th>
              <Th>Email</Th>
              <Th>Room Type</Th>
              <Th>Book Date</Th>
              <Th>Check-in</Th>
              <Th>Check-out</Th>
              <Th isNumeric>Guests</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getPaginatedBookings(bookingData).map((booking) => {
              return (
                <Tr key={parseInt(booking.id)}>
                  <Td>{String(booking.id).padStart(3, '0')}</Td>
                  <Td>{booking.guest_name}</Td>
                  <Td>{booking.email}</Td>
                  <Td>{booking.room_type}</Td>
                  <Td>{getDate(booking.booking_date)}</Td>
                  <Td>{getDate(booking.check_in_date)}</Td>
                  <Td>{getDate(booking.check_out_date)}</Td>
                  <Td isNumeric width="10px">
                    {booking.num_guests}
                  </Td>
                  <Td>{booking.status_name}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}></MenuButton>
                      <MenuList>
                        <MenuItem icon={<EditIcon />} onClick={() => openEditModal(booking.id)}>
                          Edit
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteClick(booking.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <ButtonGroup mt={4} spacing="4" display="flex" justifyContent="flex-end">
        {currentPage > 1 && (
          <Button colorScheme="teal" onClick={handlePreviousPage}>
            Previous
          </Button>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            colorScheme={pageNumber === currentPage ? 'teal' : 'gray'}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button colorScheme="teal" onClick={handleNextPage}>
            Next
          </Button>
        )}
      </ButtonGroup>
      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        bookingId={selectedBookingId}
        bookingData={bookingData}
        roomsData={roomsData}
        setBookingData={setBookingData}
      />

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Booking
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to delete this booking?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => confirmDelete(selectedBookingDeleteId)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  );
};

export default Bookings;

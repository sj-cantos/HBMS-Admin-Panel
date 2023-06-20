import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Image,Button, useDisclosure,Flex, Input,Stack, IconButton, useToast
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,ButtonGroup
} from '@chakra-ui/react'
import { EditIcon, SearchIcon, DeleteIcon,ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import AddBookingModal from '../components/AddBookingModal';
import EditBookingModal from '../components/EditBookingModal';

const Bookings = () => {
  const [bookingData,setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookingData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const[roomsData,setRoomsData] = useState([]);

  useEffect(() => {
    const getRooms = () => {
      axios
        .get('http://localhost:3003/rooms')
        .then((response) => setRoomsData(response.data))
        .catch((error) => console.log(error));
    };
    getRooms();
    return () => {
        
    }
  }, []);


  const openEditModal = bookingId => {
    setSelectedBookingId(bookingId);
    setEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setSelectedBookingId(null);
    setEditModalOpen(false);
  };
  
  const onSubmit = async (data) => {
    await console.log(data)
  }

  const getPaginatedBookings = (bookings) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bookings.slice(startIndex, endIndex);
  };

  const getDate = (datetime)=> {
    const date = new Date(datetime);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatDate = date.toLocaleDateString(undefined,options);
    
    return formatDate;
  }

  useEffect(()=>{
    const getBookings = ()=>{
      axios.get('http://localhost:3003/booking')
      .then(response=> {console.log(response.data); setBookingData(response.data)})
      .catch(error => console.log(error))
    }
    getBookings();
    return () => {
      
    };
  

  },[]);



  
  return (
    <Stack minWidth="100%">
      
      <Text>Bookings</Text>
      <Flex justifyContent="space-between" position="relative" top="125px"><AddBookingModal/><Flex alignItems="center">
          <Input placeholder="Search Rooms" width="500px" colorScheme='white' />
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search"
            ml={2}
            bg="white"
            color="tertiary"
            borderColor="tertiary"
            variant="outline"
            
          />
        </Flex></Flex>
      
      <TableContainer borderRadius="10px" mt="140px" boxShadow= "lg">
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
      
      {getPaginatedBookings(bookingData).map((booking) => (
              <Tr key={booking.id}>
                <Td>{String(booking.id).padStart(3,'0')}</Td>
                <Td>{booking.guest_name}</Td>
                <Td>{booking.email}</Td>
                <Td>{booking.room_type}</Td>
                <Td>{getDate(booking.booking_date)}</Td>
                <Td>{getDate(booking.check_in_date)}</Td>
                <Td>{getDate(booking.check_out_date)}</Td>
                <Td  isNumeric width="10px">{booking.num_guests}</Td>
                <Td>{booking.status_name}</Td>
                <Td>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>     
                  </MenuButton>
                    <MenuList>
                      <MenuItem icon={<EditIcon/>} onClick={() => openEditModal(booking.id)}>Edit</MenuItem>
                      <MenuItem icon={<DeleteIcon/>}onClick={()=>handleDelete(booking.id)}>Delete</MenuItem>
                    </MenuList>
                </Menu>
                </Td>
              </Tr>
            ))}
          
        </Tbody>

        </Table>
      

      </TableContainer>

      
      <ButtonGroup>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            colorScheme={pageNumber === currentPage ? "teal" : "gray"}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>

      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        bookingId={selectedBookingId}
        bookingData={bookingData}
        roomsData={roomsData} 
      />      
      
    
    </Stack>
  )
}

export default Bookings
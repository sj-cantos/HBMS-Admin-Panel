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
  MenuDivider
} from '@chakra-ui/react'
import { EditIcon, SearchIcon, DeleteIcon,ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(2);
const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
const totalPages = Math.ceil(bookings.length / itemsPerPage);

const getPaginatedBookings = (bookings) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return bookings.slice(startIndex, endIndex);
};



  
  return (
    <Stack>
      
      <Text>Bookings</Text>
      <Flex justifyContent="space-between" position="relative" top="125px"><Flex alignItems="center">
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
        <Table size="lg" bg="white">
          <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Guest Name</Th>
          <Th>Email</Th>
          <Th>Room Type</Th>
          <Th>Check-in</Th>
          <Th>Check-out</Th>
          <Th isNumeric>No. of guests</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
      
            <Tr >
              <Td>asfa</Td>
              <Td>asfas</Td>
              <Td>asfa</Td>
              <Td>asfsaf</Td>
              <Td>asfasf</Td>
              <Td>asfasf</Td>
              <Td isNumeric>asfasf</Td>
              <Td>Status</Td>
              <Td></Td>
            </Tr>
          
        </Tbody>

        </Table>
      

      </TableContainer>
      <ButtonGroup>
  {pageNumbers.map((pageNumber) => (
    <Button
      key={pageNumber}
      colorScheme={pageNumber === currentPage ? "blue" : "gray"}
      onClick={() => setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </Button>
  ))}
</ButtonGroup>
    
    </Stack>
  )
}

export default Bookings
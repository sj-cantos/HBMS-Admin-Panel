import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  ButtonGroup,
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
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import AddRoomModal from '../components/AddRoomModal';
import EditRoomModal from '../components/EditRoomModal';
import DeleteDialog from '../components/DeleteDialog';

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRoomId, setEditRoomId] = useState(null);
  const [editRoomData, setEditRoomData] = useState({});
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = Math.ceil(roomsData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  useEffect(() => {
    const getRooms = () => {
      axios
        .get('http://localhost:3003/rooms')
        .then((response) => setRoomsData(response.data))
        .catch((error) => console.log(error));
    };
    getRooms();
  }, []);

  const handleEdit = (id) => {
    const roomToEdit = roomsData.find((room) => room.id === id);
    setEditRoomId(id);
    setEditRoomData(roomToEdit);
    onOpen();
  };

  const handleEditSubmit = async (updatedRoomData) => {
    try {
      const response = await axios.put('http://localhost:3003/rooms/', {
        updatedRoomData,
      });
      console.log(response.data);
      const updatedRoomsData = roomsData.map((room) =>
        room.id === updatedRoomData.id ? updatedRoomData : room
      );
      setRoomsData(updatedRoomsData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteRoomId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (id) => {
    const updatedRoomsData = roomsData.filter((room) => room.id !== id);
    setRoomsData(updatedRoomsData);
    setIsDeleteDialogOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const getPaginatedRooms = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredRooms = roomsData.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return filteredRooms.slice(startIndex, endIndex);
  };
  return (
    <Stack>
      <Text>Rooms</Text>
      <Flex justifyContent="space-between">
        <AddRoomModal />
        <Flex alignItems="center">
          <Input
            placeholder="Search Rooms"
            width="500px"
            colorScheme="white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search"
            ml={2}
            bg="white"
            color="teal"
            borderColor="teal"
            variant="outline"
            onClick={handleSearch}
          />
        </Flex>
      </Flex>

      <TableContainer borderRadius="10px" mt="20px" boxShadow="lg">
        <Table size="lg" bg="white">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Images</Th>
              <Th>Room Name</Th>
              <Th>Description</Th>
              <Th>Amenities</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getPaginatedRooms().map((item) => (
              <Tr key={item.id}>
                <Td>{String(item.id).padStart(3, '0')}</Td>
                <Td>
                  <Image src={item.images[0]} height={100} width={900} borderRadius="10px" />
                </Td>
                <Td>{item.name}</Td>
                <Td sx={{ whiteSpace: 'normal', maxHeight: 'none', lineHeight: '1.1em' }}>
                  {item.description}
                </Td>
                <Td>
                  <Text sx={{ whiteSpace: 'normal', maxHeight: 'none', lineHeight: '1.1em' }}>
                    {item.amenities}
                  </Text>
                </Td>
                <Td>{item.price}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} />
                    <MenuList>
                      <MenuItem icon={<EditIcon />} onClick={() => handleEdit(item.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem icon={<DeleteIcon />} onClick={() => handleDelete(item.id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
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

      {editRoomId && (
        <EditRoomModal
          isOpen={isOpen}
          onClose={onClose}
          roomData={editRoomData}
          onSubmit={handleEditSubmit}
        />
      )}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        roomId={deleteRoomId}
        onDelete={confirmDelete}
      />
    </Stack>
  );
};

export default Rooms;

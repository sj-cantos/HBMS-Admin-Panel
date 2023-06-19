import React, { useEffect } from 'react'
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
import { useState } from 'react';
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

  const handleDelete = (id) => {
    setDeleteRoomId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (id) => {
    const updatedRoomsData = roomsData.filter((room) => room.id !== id);
    setRoomsData(updatedRoomsData);
    setIsDeleteDialogOpen(false);
  };


   
  useEffect(()=>{
    const getRooms = ()=>{
      axios.get('http://localhost:3003/rooms')
      .then(response=> setRoomsData(response.data))
      .catch(error => console.log(error))
    }
    getRooms();
    return () => {
      
    };
  

  },[]);

  const handleEdit = (id) => {
    const roomToEdit = roomsData.find((room) => room.id === id);
    setEditRoomId(id);
    setEditRoomData(roomToEdit);
    onOpen();
  };
  
  const handleEditSubmit = async (updatedRoomData) => {
    
    try{

        const response = await axios.put('http://localhost:3003/rooms/',{updatedRoomData})
        if(response){
          console.log("returned data")
        }else{
          console.log("here")
        }
        console.log(response.data) 
        const updatedRoomsData = roomsData.map((room) =>
          room.id === updatedRoomData.id ? updatedRoomData : room
        );
        
        setRoomsData(updatedRoomsData);
      
        // Close the edit modal
        onClose();
    }catch(error){
      console.log(error)
    }
    // After the API call is successful, update the roomsData state with the updated room data
    
  };

  
 
  return (
    <Stack>
      
      <Text>Rooms</Text>
      <Flex justifyContent="space-between" position="relative" top="125px"><AddRoomModal/><Flex alignItems="center">
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
          <Th>Images</Th>
          <Th>Room Name</Th>
          <Th>Description</Th>
          <Th>Amenities</Th>
          <Th isNumeric>Price</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
      {roomsData.map((item) => (
        
        <Tr key={item.id}>
          <Td>{String(item.id).padStart(3, '0')}</Td>
          <Td>
                <Image src={item.images[0]} height={100} width={900} borderRadius="10px"/>  
            </Td>
          <Td>{item.name}</Td>
          <Td sx={{ whiteSpace: "normal", maxHeight:  "none" , lineHeight: "1.1em" }}>{item.description}</Td>

          <Td>
              <Text sx={{ whiteSpace: "normal", maxHeight:  "none" , lineHeight: "1.1em" }}>
                {item.amenities}
              </Text> 
          </Td>
          <Td>{item.price}</Td>
          <Td>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              
            </MenuButton>
              <MenuList>
                <MenuItem icon={<EditIcon/>} onClick={() => handleEdit(item.id)}>Edit</MenuItem>
                <MenuItem icon={<DeleteIcon/>}onClick={()=>handleDelete(item.id)}>Delete</MenuItem>
              </MenuList>
          </Menu>
          </Td>
        </Tr>
      ))}
    </Tbody>

        </Table>
      </TableContainer>
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
  )
}

export default Rooms
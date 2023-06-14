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
  Image,Button, useDisclosure,Flex, Input,Stack, IconButton
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState } from 'react';
import AddRoomModal from '../components/AddRoomModal';

const Rooms = () => {

  const [roomsData, setRoomsData] = useState([]);
   
  useEffect(()=>{
    const getRooms = ()=>{
      axios.get('http://localhost:3003/rooms')
      .then(response=> setRoomsData(response.data))
      .catch(error => console.log(error))
    }
  getRooms();

  });
  
 
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
          <Th>Bed Type</Th>
          <Th>Status</Th>
          <Th>Amenities</Th>
          <Th isNumeric>Price</Th>
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
          <Td>{item.bed_type}</Td>
          <Td>{item.status}</Td>
          <Td>
              <Text sx={{ whiteSpace: "normal", maxHeight:  "none" , lineHeight: "1.1em" }}>
                {item.amenities}
              </Text> 
          </Td>
          <Td>{item.price}</Td>
          {/* Add more table cells as needed */}
        </Tr>
      ))}
    </Tbody>

        </Table>
      </TableContainer>
    
    </Stack>
  )
}

export default Rooms
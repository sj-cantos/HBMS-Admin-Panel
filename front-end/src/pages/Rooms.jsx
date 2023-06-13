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
  Image
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';

const Rooms = () => {

  const [roomsData, setRoomsData] = useState([]);
  const [showFullAmenities, setShowFullAmenities] = useState(false);
  
  useEffect(()=>{
    const getRooms = ()=>{
      axios.get('http://localhost:3003/rooms')
      .then(response=> setRoomsData(response.data))
      .catch(error => console.log(error))
    }
  getRooms();

  });
  

  return (
    <div>
      Rooms
      {/*Initial table, not yet responsive*/ }
      <TableContainer borderRadius="10px" mt="140px">
        <Table size="lg">
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
              <Text style={{ whiteSpace: "normal", maxHeight:  "none" , lineHeight: "1.1em" }}>
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
    
    </div>
  )
}

export default Rooms
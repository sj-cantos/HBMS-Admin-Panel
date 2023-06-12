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
  Tooltip
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
const Rooms = () => {

  const [roomsData, setRoomsData] = useState([]);
  const [showFullAmenities, setShowFullAmenities] = useState(false);
  
  useEffect(()=>{
    const getRooms = ()=>{
      axios.get('http://localhost:3003/rooms')
      .then(response=> {if (Array.isArray(response.data)) {
        setRoomsData(response.data);
      } else {
        console.log("Invalid data format:", response.data);
      }
      })
      .catch(console.log("error"))
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
          <Td>{item.name}</Td>
          <Td>{item.bed_type}</Td>
          <Td>{item.status}</Td>
          <Td>
              <div style={{ whiteSpace: "normal", maxHeight:  "none" , lineHeight: "1.1em" }}>
                {item.amenities}
              </div> 
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
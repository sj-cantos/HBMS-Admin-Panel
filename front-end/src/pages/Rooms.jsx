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
} from '@chakra-ui/react'

const Rooms = () => {
  return (
    <div>
      Rooms
      <TableContainer >
        <Table size="lg">
          <Thead>
        <Tr>
          <Th>Room Name</Th>
          <Th>Bed Type</Th>
          <Th>Status</Th>
          <Th>Amenities</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        
      </Tbody>

        </Table>
      </TableContainer>
    
    </div>
  )
}

export default Rooms
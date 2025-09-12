// 'use client'

// import {
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Checkbox,
//   IconButton,
//   TableContainer,
//   Flex,
//   Text,
//   useColorModeValue,
//   Tooltip,
// } from '@chakra-ui/react'
// import { RepeatIcon } from '@chakra-ui/icons'
// import { useState } from 'react'


// const columns = [
//   { key: 'poNumber', label: 'Purchase order' },
//   { key: 'vendorAccount', label: 'Vendor account' },
//   { key: 'invoiceAccount', label: 'Invoice account' },
//   { key: 'vendorName', label: 'Vendor name' },
//   { key: 'purchaseType', label: 'Purchase type' },
//   { key: 'approvalStatus', label: 'Approval status' },
//   { key: 'purchaseOrderStatus', label: 'Purchase order status' },
//   { key: 'currency', label: 'Currency' },
//   { key: 'requestedReceiptDate', label: 'Requested receipt date' },
//   { key: 'modeOfDelivery', label: 'Mode of delivery' },
// ]

// export default function PurchaseOrderListTable({ data = [], onRefresh = () => {} }) {
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null)

//   const headerBg = useColorModeValue('gray.50', 'gray.800')
//   const hoverBg = useColorModeValue('gray.100', 'gray.700')
//   const selectedBg = useColorModeValue('blue.50', 'blue.900')

//   return (
//     <Box w="full" overflowX="auto">
//       <TableContainer border="1px solid" borderColor="gray.200" borderRadius="md">
//         <Table size="sm" variant="unstyled">
//           <Thead bg={headerBg} position="sticky" top={0} zIndex={1}>
//             <Tr>
//               <Th p={2} w="40px">
//                 <Checkbox />
//               </Th>
//               <Th p={2} w="40px">
//                 <Tooltip label="Refresh" hasArrow>
//                   <IconButton
//                     icon={<RepeatIcon />}
//                     aria-label="Refresh"
//                     size="xs"
//                     variant="ghost"
//                     onClick={onRefresh}
//                   />
//                 </Tooltip>
//               </Th>
//               {columns.map((col) => (
//                 <Th
//                   key={col.key}
//                   whiteSpace="nowrap"
//                   fontWeight="semibold"
//                   color="gray.700"
//                   fontSize="sm"
//                   p={2}
//                 >
//                   {col.label}
//                 </Th>
//               ))}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {data.map((row, idx) => {
//               const isSelected = idx === selectedRowIndex
//               return (
//                 <Tr
//                   key={row.poNumber || idx}
//                   bg={isSelected ? selectedBg : 'transparent'}
//                   _hover={{ bg: hoverBg, cursor: 'pointer' }}
//                   onClick={() =>
//                     setSelectedRowIndex(isSelected ? null : idx)
//                   }
//                 >
//                   <Td p={2}>
//                     <Checkbox isChecked={isSelected} />
//                   </Td>
//                   <Td p={2}>
//                     <Text fontSize="xs" color="gray.500">
//                       ⋮
//                     </Text>
//                   </Td>
//                   {columns.map((col) => (
//                     <Td key={col.key} whiteSpace="nowrap" p={2} fontSize="sm">
//                       {row[col.key] || '--'}
//                     </Td>
//                   ))}
//                 </Tr>
//               )
//             })}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </Box>
//   )
// }


'use client'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  TableContainer,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Tooltip,
  Link as ChakraLink, // Renamed to avoid conflict
} from '@chakra-ui/react';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const columns = [
  { key: 'poNumber', label: 'Purchase Order' },
  { key: 'vendorAccount', label: 'Vendor Account' },
  { key: 'invoiceAccount', label: 'Invoice Account' },
  { key: 'vendorName', label: 'Vendor Name' },
  { key: 'purchaseType', label: 'Purchase Type' },
  { key: 'approvalStatus', label: 'Approval Status' },
  { key: 'purchaseOrderStatus', label: 'PO Status' },
  { key: 'currency', label: 'Currency' },
  { key: 'requestedReceiptDate', label: 'Requested Receipt Date' },
  { key: 'modeOfDelivery', label: 'Mode of Delivery' },
]

export default function PurchaseOrderListTable({ data = [], onRefresh = () => { } }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)
  const [filterText, setFilterText] = useState('')

  const headerBg = useColorModeValue('gray.100', 'gray.900')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const selectedBg = useColorModeValue('blue.50', 'blue.800')


  const filteredData = useMemo(() => {
    if (!filterText) return data
    return data.filter(po =>
      Object.values(po).some(val =>
        String(val).toLowerCase().includes(filterText.toLowerCase())
      )
    )
  }, [data, filterText])

  return (
    <Box w="full" overflowX="auto">
      <Flex mb={4} justify="space-between" align="center">
        <InputGroup w={{ base: '100%', md: '300px' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Filter purchase orders..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            bg={useColorModeValue('white', 'gray.800')}
          />
        </InputGroup>

        <Tooltip label="Refresh Purchase Orders" hasArrow>
          <IconButton
            icon={<RepeatIcon />}
            aria-label="Refresh"
            size="sm"
            colorScheme="teal"
            onClick={onRefresh}
          />
        </Tooltip>
      </Flex>

      <TableContainer border="1px solid" borderColor="gray.200" borderRadius="md" shadow="sm">
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead bg={headerBg} position="sticky" top={0} zIndex={2}>
            <Tr>
              <Th p={2} w="40px">
                <Checkbox />
              </Th>
              {columns.map((col) => (
                <Th key={col.key} whiteSpace="nowrap" fontWeight="semibold" color="gray.700" fontSize="sm" p={2}>
                  {col.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((row, idx) => {
              const isSelected = idx === selectedRowIndex
              return (
                <Tr
                  key={row.poNumber || idx}
                  bg={isSelected ? selectedBg : 'transparent'}
                  _hover={{ bg: hoverBg, cursor: 'pointer' }}
                  onClick={() => setSelectedRowIndex(isSelected ? null : idx)}
                >
                  <Td p={2}>
                    <Checkbox isChecked={isSelected} />
                  </Td>
                  {columns.map((col) => (
                    <Td key={col.key} whiteSpace="nowrap" p={2} fontSize="sm">
                      {col.key === 'poNumber' ? (
                        <Link
                          href={`/Dashboard/modules/purchaseorder/${row.poNumber}`}
                          style={{ color: '#202347ff', fontWeight: 600, textDecoration: 'none' }}
                        >
                          {row[col.key]}
                        </Link>
                      ) : (
                        row[col.key] || '--'
                      )}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

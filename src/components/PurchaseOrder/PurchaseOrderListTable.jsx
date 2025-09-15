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
  Link as ChakraLink,
} from '@chakra-ui/react'
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import NextLink from 'next/link'

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
  const selectedBg = useColorModeValue('blue.50', 'blue.900')

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
      <Flex mb={4} justify="space-between" align="center" gap={4} flexWrap="wrap">
        <InputGroup w={{ base: '100%', md: '300px' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search purchase orders..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="full"
            shadow="sm"
          />
        </InputGroup>

        <Tooltip label="Refresh purchase orders" hasArrow>
          <IconButton
            icon={<RepeatIcon />}
            aria-label="Refresh"
            size="md"
            variant="ghost"
            colorScheme="blue"
            onClick={onRefresh}
            borderRadius="full"
            boxShadow="sm"
            transition="all 0.2s ease"
            _hover={{ bg: 'blue.100', transform: 'rotate(90deg)' }}
          />
        </Tooltip>
      </Flex>

      <TableContainer border="1px solid" borderColor="gray.200" borderRadius="lg" shadow="md">
        <Table size="sm" variant="simple">
          <Thead bg={headerBg} position="sticky" top={0} zIndex={1} shadow="sm">
            <Tr>
              <Th p={3} w="40px">
                <Checkbox />
              </Th>
              {columns.map((col) => (
                <Th
                  key={col.key}
                  whiteSpace="nowrap"
                  fontWeight="semibold"
                  color="gray.700"
                  fontSize="sm"
                  p={3}
                >
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
                  <Td p={3}>
                    <Checkbox isChecked={isSelected} />
                  </Td>

                  {columns.map((col) => (
                    <Td key={col.key} whiteSpace="nowrap" p={3} fontSize="sm">
                      {col.key === 'poNumber' ? (
                        <ChakraLink
                          as={NextLink}
                          href={`/Dashboard/modules/purchaseorder/${row.poNumber}`}
                          color="blue.700"
                          fontWeight="semibold"
                          _hover={{ textDecoration: 'underline', color: 'blue.800' }}
                        >
                          {row[col.key]}
                        </ChakraLink>
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
//   Input,
//   InputGroup,
//   InputLeftElement,
//   useColorModeValue,
//   Tooltip,
//   Link as ChakraLink,
// } from '@chakra-ui/react';
// import { RepeatIcon, SearchIcon } from '@chakra-ui/icons'
// import { useState, useMemo } from 'react'
// import Link from 'next/link'

// const columns = [
//   { key: 'poNumber', label: 'Purchase Order' },
//   { key: 'vendorAccount', label: 'Vendor Account' },
//   { key: 'invoiceAccount', label: 'Invoice Account' },
//   { key: 'vendorName', label: 'Vendor Name' },
//   { key: 'purchaseType', label: 'Purchase Type' },
//   { key: 'approvalStatus', label: 'Approval Status' },
//   { key: 'purchaseOrderStatus', label: 'PO Status' },
//   { key: 'currency', label: 'Currency' },
//   { key: 'requestedReceiptDate', label: 'Requested Receipt Date' },
//   { key: 'modeOfDelivery', label: 'Mode of Delivery' },
// ]

// export default function PurchaseOrderListTable({ data = [], onRefresh = () => { } }) {
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null)
//   const [filterText, setFilterText] = useState('')

//   const headerBg = useColorModeValue('gray.100', 'gray.900')
//   const hoverBg = useColorModeValue('gray.50', 'gray.700')
//   const selectedBg = useColorModeValue('blue.50', 'blue.800')


//   const filteredData = useMemo(() => {
//     if (!filterText) return data
//     return data.filter(po =>
//       Object.values(po).some(val =>
//         String(val).toLowerCase().includes(filterText.toLowerCase())
//       )
//     )
//   }, [data, filterText])

//   return (
//     <Box w="full" overflowX="auto">
//       <Flex mb={4} justify="space-between" align="center">
//         <InputGroup w={{ base: '100%', md: '300px' }}>
//           <InputLeftElement pointerEvents="none">
//             <SearchIcon color="gray.400" />
//           </InputLeftElement>
//           <Input
//             placeholder="Filter purchase orders..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             bg={useColorModeValue('white', 'gray.800')}
//           />
//         </InputGroup>

//         <Tooltip label="Refresh Purchase Orders" hasArrow>
//           <IconButton
//             icon={<RepeatIcon />}
//             aria-label="Refresh"
//             size="sm"
//             colorScheme="teal"
//             onClick={onRefresh}
//           />
//         </Tooltip>
//       </Flex>

//       <TableContainer border="1px solid" borderColor="gray.200" borderRadius="md" shadow="sm">
//         <Table size="sm" variant="striped" colorScheme="gray">
//           <Thead bg={headerBg} position="sticky" top={0} zIndex={2}>
//             <Tr>
//               <Th p={2} w="40px">
//                 <Checkbox />
//               </Th>
//               {columns.map((col) => (
//                 <Th key={col.key} whiteSpace="nowrap" fontWeight="semibold" color="gray.700" fontSize="sm" p={2}>
//                   {col.label}
//                 </Th>
//               ))}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {filteredData.map((row, idx) => {
//               const isSelected = idx === selectedRowIndex
//               return (
//                 <Tr
//                   key={row.poNumber || idx}
//                   bg={isSelected ? selectedBg : 'transparent'}
//                   _hover={{ bg: hoverBg, cursor: 'pointer' }}
//                   onClick={() => setSelectedRowIndex(isSelected ? null : idx)}
//                 >
//                   <Td p={2}>
//                     <Checkbox isChecked={isSelected} />
//                   </Td>
//                   {columns.map((col) => (
//                     <Td key={col.key} whiteSpace="nowrap" p={2} fontSize="sm">
//                       {col.key === 'poNumber' ? (
//                         <Link
//                           href={`/Dashboard/modules/purchaseorder/${row.poNumber}`}
//                           style={{ color: '#202347ff', fontWeight: 600, textDecoration: 'none' }}
//                         >
//                           {row[col.key]}
//                         </Link>
//                       ) : (
//                         row[col.key] || '--'
//                       )}
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

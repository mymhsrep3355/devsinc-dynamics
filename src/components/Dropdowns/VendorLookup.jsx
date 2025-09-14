'use client'

import {
  Box,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function VendorLookupDropdown({ vendors = [], onSelect }) {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // Initialize filtered list when vendors are fetched
    setFiltered(vendors)
  }, [vendors])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    setShowDropdown(true)

    const lower = value.toLowerCase()
    const filteredVendors = vendors.filter(v =>
      v.VendorAccountNumber?.toLowerCase().includes(lower) ||
      v.VendorOrganizationName?.toLowerCase().includes(lower)
    )
    setFiltered(filteredVendors)
  }

  const handleSelect = (vendor) => {
    onSelect(vendor)
    setSearch(vendor.VendorAccountNumber)
    setShowDropdown(false)
  }

  const dropdownBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const hoverBg = useColorModeValue("gray.100", "gray.700")

  return (
    <Box position="relative" w="full">
      <Input
        placeholder="Search vendor by name or account"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)}
        bg="white"
        borderColor={borderColor}
        boxShadow="sm"
        _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
      />

      {showDropdown && (
        <Box
          position="absolute"
          w="full"
          mt={2}
          bg={dropdownBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
          boxShadow="lg"
          maxH="320px"
          overflowY="auto"
          zIndex={20}
        >
          {filtered.length > 0 ? (
            <Table size="sm" variant="simple">
              <Thead bg="gray.100" position="sticky" top={0} zIndex={1}>
                <Tr>
                  <Th>Vendor Account</Th>
                  <Th>Name</Th>
                  <Th>Search Name</Th>
                  <Th>Phone</Th>
                  <Th>City</Th>
                  <Th>State</Th>
                  <Th>Country</Th>
                  <Th>ZIP</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filtered.map((v) => (
                  <Tr
                    key={v.VendorAccountNumber}
                    onClick={() => handleSelect(v)}
                    cursor="pointer"
                    _hover={{ bg: hoverBg }}
                    transition="background 0.2s"
                  >
                    <Td>{v.VendorAccountNumber}</Td>
                    <Td>{v.VendorOrganizationName}</Td>
                    <Td>{v.VendorSearchName}</Td>
                    <Td>{v.PrimaryPhoneNumber}</Td>
                    <Td>{v.AddressCity}</Td>
                    <Td>{v.AddressStateId}</Td>
                    <Td>{v.AddressCountryRegionId}</Td>
                    <Td>{v.AddressZipCode}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text p={4} color="gray.500" textAlign="center">
              No vendors found.
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
}

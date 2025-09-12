'use client'

import {
  Box, Input, Table, Thead, Tr, Th, Td, Tbody, VStack, Text
} from '@chakra-ui/react'
import { useState } from 'react'

export default function VendorLookupDropdown({ vendors = [], onSelect }) {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(vendors)
  const [showDropdown, setShowDropdown] = useState(false)

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

  return (
    <Box position="relative">
      <Input
        placeholder="Select vendor account"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && filtered.length > 0 && (
        <Box
          position="absolute"
          bg="white"
          border="1px solid #ccc"
          borderRadius="md"
          mt={1}
          maxH="300px"
          w="full"
          zIndex={10}
          overflowY="auto"
        >
          <Table size="sm">
            <Thead bg="gray.100" position="sticky" top={0} zIndex={1}>
              <Tr>
                <Th>Vendor account</Th>
                <Th>Name</Th>
                <Th>Search name</Th>
                <Th>Phone</Th>
                <Th>City</Th>
                <Th>State</Th>
                <Th>Country/region</Th>
                <Th>ZIP/postal code</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((v) => (
                <Tr key={v.VendorAccountNumber} onClick={() => handleSelect(v)} cursor="pointer" _hover={{ bg: "gray.100" }}>
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
        </Box>
      )}

      {showDropdown && filtered.length === 0 && (
        <Text mt={2} color="gray.500">No vendors found</Text>
      )}
    </Box>
  )
}

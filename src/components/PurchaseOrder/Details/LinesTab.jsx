'use client'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Flex,
  Text,
  Divider,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  chakra,
} from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import FormLookups from '@/components/FormLookups'

const itemList = [
  { id: '1000', name: 'Surface Pro 128 GB' },
  { id: '2000', name: 'Surface Laptop 5' },
]
const siteList = [{ id: '1', name: 'New York DC' }]
const warehouseList = [{ id: '11', name: 'Main WH' }]

export default function LinesTab() {
  const [lines, setLines] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [showNewLineForm, setShowNewLineForm] = useState(false)
  const [newLine, setNewLine] = useState({
    item: null,
    productName: '',
    category: '',
    variant: '',
    site: null,
    warehouse: null,
    cwQty: '',
    cwUnit: '',
  })

  const handleSelect = (field, value) => {
    setNewLine(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'item' ? { productName: value.name } : {}),
    }))
  }

  const handleInputChange = (field, value) => {
    setNewLine(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveLine = () => {
    setLines(prev => [...prev, { ...newLine, lineNumber: prev.length + 1 }])
    setNewLine({
      item: null,
      productName: '',
      category: '',
      variant: '',
      site: null,
      warehouse: null,
      cwQty: '',
      cwUnit: '',
    })
    setShowNewLineForm(false)
  }

  const headerBg = useColorModeValue('white', 'gray.700')

  return (
    <Box p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
      {/* Header Row Actions */}
      <Flex wrap="wrap" gap={3} align="center" mb={3}>
        <Button size="sm" colorScheme="blue" variant="link" onClick={() => setShowNewLineForm(true)}>
          + Add line
        </Button>
        <Button size="sm" colorScheme="blue" variant="link">+ Add lines</Button>
        <Button size="sm" variant="link">Add products</Button>
        <Button size="sm" variant="link" color="red.500">🗑 Remove</Button>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Purchase order line
          </MenuButton>
          <MenuList>
            <MenuItem>Edit line</MenuItem>
            <MenuItem>Copy line</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Financials
          </MenuButton>
          <MenuList>
            <MenuItem>Charges</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Inventory
          </MenuButton>
          <MenuList>
            <MenuItem>Transactions</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Product and supply
          </MenuButton>
          <MenuList>
            <MenuItem>Product details</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Update line
          </MenuButton>
          <MenuList>
            <MenuItem>Delivery schedule</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Warehouse
          </MenuButton>
          <MenuList>
            <MenuItem>Warehouse management</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" variant="link" rightIcon={<ChevronDownIcon />}>
            Engineering change
          </MenuButton>
          <MenuList>
            <MenuItem>Engineering versions</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table size="sm" variant="unstyled">
          <Thead bg={headerBg} borderTop="1px solid" borderColor="gray.200">
            <Tr borderBottom="1px solid" borderColor="gray.300">
              <Th></Th>
              <Th>Line number</Th>
              <Th>Item number</Th>
              <Th>Product name</Th>
              <Th>Procurement category</Th>
              <Th>Variant number</Th>
              <Th>Site</Th>
              <Th>Warehouse</Th>
              <Th>CW quantity</Th>
              <Th>CW unit</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {lines.map((line, idx) => (
              <Tr
                key={idx}
                bg={selectedIdx === idx ? 'blue.50' : 'transparent'}
                _hover={{ bg: 'gray.50' }}
                cursor="pointer"
                onClick={() => setSelectedIdx(idx)}
              >
                <Td>
                  <chakra.input type="radio" checked={selectedIdx === idx} readOnly />
                </Td>
                <Td>{line.lineNumber}</Td>
                <Td color="blue.600" fontWeight="semibold">{line.item?.id}</Td>
                <Td>{line.productName}</Td>
                <Td>{line.category}</Td>
                <Td>{line.variant}</Td>
                <Td>{line.site?.id}</Td>
                <Td>{line.warehouse?.id}</Td>
                <Td>{line.cwQty}</Td>
                <Td>{line.cwUnit}</Td>
                <Td></Td>
              </Tr>
            ))}

            {showNewLineForm && (
              <Tr bg="blue.50">
                <Td></Td>
                <Td>{lines.length + 1}</Td>
                <Td>
                  <FormLookups
                    placeholder="Select"
                    data={itemList}
                    selectedValue={newLine.item}
                    onSelect={(val) => handleSelect('item', val)}
                  />
                </Td>
                <Td>
                  <Input
                    size="sm"
                    value={newLine.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    size="sm"
                    value={newLine.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    size="sm"
                    value={newLine.variant}
                    onChange={(e) => handleInputChange('variant', e.target.value)}
                  />
                </Td>
                <Td>
                  <FormLookups
                    placeholder="Select"
                    data={siteList}
                    selectedValue={newLine.site}
                    onSelect={(val) => handleSelect('site', val)}
                  />
                </Td>
                <Td>
                  <FormLookups
                    placeholder="Select"
                    data={warehouseList}
                    selectedValue={newLine.warehouse}
                    onSelect={(val) => handleSelect('warehouse', val)}
                  />
                </Td>
                <Td>
                  <Input
                    size="sm"
                    value={newLine.cwQty}
                    onChange={(e) => handleInputChange('cwQty', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    size="sm"
                    value={newLine.cwUnit}
                    onChange={(e) => handleInputChange('cwUnit', e.target.value)}
                  />
                </Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Cancel"
                      size="xs"
                      colorScheme="red"
                      onClick={() => setShowNewLineForm(false)}
                    />
                    <IconButton
                      icon={<Text fontSize="xs">✔</Text>}
                      aria-label="Save"
                      size="xs"
                      colorScheme="green"
                      onClick={handleSaveLine}
                    />
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

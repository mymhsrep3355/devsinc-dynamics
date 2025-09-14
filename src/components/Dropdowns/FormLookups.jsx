'use client';

import {
  Box,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Spinner,
  Button,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function FormLookups({
  label = '',
  placeholder = '',
  data = [],
  loading = false,
  idField = 'id',
  nameField = 'name',
  selectedValue = null,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item =>
      (item[idField] + item[nameField]).toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearchText('');
  };

  return (
    <Box>
      <Text mb={1} fontWeight="semibold">{label}</Text>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="bottom-start">
        <PopoverTrigger>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            rightIcon={<ChevronDownIcon />}
            w="100%"
            variant="outline"
            fontWeight="normal"
            justifyContent="space-between"
            borderColor="gray.300"
            bg="white"
          >
            {/* {selectedValue
              ? `${selectedValue[idField]} - ${selectedValue[nameField]}`
              : placeholder} */}
            {selectedValue
              ? selectedValue[idField]
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent w="100%" maxW="420px" zIndex={50} boxShadow="lg">
          <PopoverBody>
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              mb={3}
              borderColor="gray.300"
              focusBorderColor="blue.500"
              bg="white"
            />
            {loading ? (
              <Flex justify="center" align="center" minH="100px">
                <Spinner />
              </Flex>
            ) : (
              <Box maxH="250px" overflowY="auto">
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th fontSize="xs">Code</Th>
                      <Th fontSize="xs">Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredData.map(item => (
                      <Tr
                        key={item[idField]}
                        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                        onClick={() => handleSelect(item)}
                      >
                        <Td fontSize="sm">{item[idField]}</Td>
                        <Td fontSize="sm">{item[nameField]}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

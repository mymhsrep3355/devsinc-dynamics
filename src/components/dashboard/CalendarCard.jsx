'use client'

import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarCard() {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const dates = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      px={4}
      py={4}
    >
      <Text fontSize="sm" fontWeight="medium" mb={3}>
        September 2025
      </Text>
      <HStack justify="space-between" mb={1}>
        <IconButton
          icon={<ChevronLeft size={16} />}
          size="xs"
          variant="ghost"
          aria-label="Prev"
        />
        <Text fontSize="xs" color="gray.600">September 2025</Text>
        <IconButton
          icon={<ChevronRight size={16} />}
          size="xs"
          variant="ghost"
          aria-label="Next"
        />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} mt={2}>
        {days.map((day) => (
          <Text key={day} fontSize="xs" textAlign="center" color="gray.500">
            {day}
          </Text>
        ))}
        {dates.map((date) => (
          <GridItem key={date}>
            <Box
              bg={date === 11 ? 'blue.500' : 'transparent'}
              color={date === 11 ? 'white' : 'gray.700'}
              textAlign="center"
              borderRadius="full"
              fontSize="xs"
              p={1}
            >
              {date}
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
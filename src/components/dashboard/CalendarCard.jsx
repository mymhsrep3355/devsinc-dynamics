'use client'

import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Grid,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = Array(startDay).fill(null)
  const thisMonthDays = Array.from({ length: lastDate }, (_, i) => i + 1)
  const daysArr = [...prevMonthDays, ...thisMonthDays]
  while (daysArr.length % 7 !== 0) daysArr.push(null)
  return daysArr
}

export default function CalendarCard() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month

  const daysArr = getMonthMatrix(year, month)
  const monthName = viewDate.toLocaleString('default', { month: 'long' })

  const bg = useColorModeValue('white', 'gray.800')
  const border = useColorModeValue('gray.200', 'gray.700')
  const todayBg = useColorModeValue('blue.600', 'blue.400')
  const todayColor = useColorModeValue('white', 'gray.900')
  const hoverBg = useColorModeValue('blue.50', 'blue.900')
  const inactiveColor = useColorModeValue('gray.400', 'gray.600')

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1))

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="1xl"
      boxShadow="lg"
      px={5}
      py={4}
      w="full"
      maxW="550px"
      mx="auto"
      position="relative"
      minH="400px"
      overflow="hidden"
    >
      <HStack justify="space-between" mb={2} align="center">
        <IconButton
          icon={<ChevronLeft size={18} />}
          size="sm"
          variant="ghost"
          aria-label="Prev month"
          borderRadius="full"
          onClick={handlePrevMonth}
        />
        <Text fontWeight="bold" fontSize="md" color="gray.800">
          {monthName} {year}
        </Text>
        <IconButton
          icon={<ChevronRight size={18} />}
          size="sm"
          variant="ghost"
          aria-label="Next month"
          borderRadius="full"
          onClick={handleNextMonth}
        />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={1} px={1}>
        {days.map((d) => (
          <Text key={d} fontSize="xs" textAlign="center" fontWeight="semibold" color="gray.500">
            {d}
          </Text>
        ))}
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} px={1}>
        {daysArr.map((date, idx) => {
          const isToday =
            isThisMonth && date === today.getDate()
          return (
            <GridItem key={idx} h="32px">
              {date ? (
                <Box
                  textAlign="center"
                  borderRadius="full"
                  fontSize="sm"
                  color={isToday ? todayColor : "gray.800"}
                  fontWeight={isToday ? "bold" : "normal"}
                  bg={isToday ? todayBg : "transparent"}
                  _hover={{
                    bg: !isToday && hoverBg,
                    color: !isToday && 'blue.700',
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  transition="all 0.12s"
                  lineHeight="32px"
                >
                  {date}
                </Box>
              ) : (
                <Box h="32px" />
              )}
            </GridItem>
          )
        })}
      </Grid>
      <Box position="absolute" bottom={3} left={0} w="full" textAlign="center">
        <Text fontSize="xs" color="gray.400">
          Today:{" "}
          <Box as="span" color={todayBg} fontWeight="bold">
            {today.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </Box>
        </Text>
      </Box>
    </Box>
  )
}

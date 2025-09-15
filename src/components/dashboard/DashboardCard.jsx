'use client'

import { Box, Flex, Icon, Text } from '@chakra-ui/react'

export default function DashboardCard({ icon: IconComponent, label, ...props }) {
  return (
    <Box
      bg="gray.50"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="base"
      p={5}
      minW="240px"
      minH="110px"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-3px)',
        cursor: 'pointer',
        bg: 'gray.100',
      }}
      {...props}
    >
      <Flex align="center" gap={4}>
        <Icon
          as={IconComponent}
          boxSize={10}
          color="blue.500"
        />
        <Text
          fontWeight="semibold"
          fontSize="lg"
          color="gray.800"
        >
          {label}
        </Text>
      </Flex>
    </Box>
  )
}

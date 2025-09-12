'use client'

import { Box, Flex, Icon, Text } from '@chakra-ui/react'

export default function DashboardCard({ icon: IconComponent, label }) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      px={4}
      py={3}
      _hover={{ boxShadow: 'md', cursor: 'pointer' }}
    >
      <Flex align="center" gap={3}>
        <Icon as={IconComponent} boxSize={6} color="blue.500" />
        <Text fontWeight="medium" fontSize="sm" color="gray.800">
          {label}
        </Text>
      </Flex>
    </Box>
  )
}

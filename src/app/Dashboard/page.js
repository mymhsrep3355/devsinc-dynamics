'use client'

import { Box, Heading, Text } from '@chakra-ui/react'

export default function DashboardHomePage() {
  return (
    <Box>
      <Heading size="lg" mb={2}>
        Welcome to the Dashboard
      </Heading>
      <Text color="gray.600">
        Use the sidebar to navigate through modules and workspaces.
      </Text>
    </Box>
  )
}
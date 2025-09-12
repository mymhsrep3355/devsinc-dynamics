import { Box, Flex } from '@chakra-ui/react'

import TopBar from '@/components/dashboard/TopBar'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <TopBar />
                
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={6} bg="gray.50" overflow="auto" >
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
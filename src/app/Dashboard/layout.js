'use client'

import { Box, Flex } from '@chakra-ui/react'

import TopBar from '@/components/dashboard/TopBar'
import Sidebar from '@/components/dashboard/Sidebar'
import { RefreshLoadingProvider, useRefreshLoading } from 'context/RefreshLoadingContext'
import LoadingPage from '../Loading/page'
export default function DashboardLayout({ children }) {
  const { isLoading } = useRefreshLoading() || {};

  return (
    <RefreshLoadingProvider>
    <Flex direction="column" minH="100vh">
      <TopBar />
                
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={6} bg="gray.50" overflow="auto" >
          {isLoading && <Box position="fixed" inset={0} zIndex={10000}><LoadingPage /></Box>}
          {children}
        </Box>
      </Flex>
    </Flex>
    </RefreshLoadingProvider>
  )
}
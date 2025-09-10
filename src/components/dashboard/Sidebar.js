'use client'

import {
  Box,
  VStack,
  Text,
  IconButton,
  useBreakpointValue,
  Flex,
  Tooltip,
} from '@chakra-ui/react'
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import {
  PackageIcon,
  TruckIcon,
  WarehouseIcon,
  UsersIcon,
} from 'lucide-react'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { label: 'Purchase Order', icon: <PackageIcon size={18} /> },
  { label: 'Transfer Order', icon: <TruckIcon size={18} /> },
  { label: 'Inventory Management', icon: <WarehouseIcon size={18} /> },
  { label: 'Customer Management', icon: <UsersIcon size={18} /> },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const pathname = usePathname()

  return (
    <Box
      w={collapsed ? '60px' : '240px'}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      transition="width 0.2s ease"
      overflowY="auto"
      h="calc(100vh - 56px)"
      position="sticky"
      top="56px"
      zIndex={50}
    >
      <Flex justify={collapsed ? 'center' : 'flex-end'} p={2} pt={4}>
        <IconButton
          icon={collapsed ? <HamburgerIcon /> : <ChevronLeftIcon />}
          onClick={() => setCollapsed(!collapsed)}
          size="md"
          variant="ghost"
          aria-label="Toggle Sidebar"
        />
      </Flex>

      <VStack align="start" spacing={1} px={collapsed ? 1 : 4} py={2}>
        {navItems.map((item) => {
          const slug = item.label.toLowerCase().replace(/\s+/g, '')
          const href = `/Dashboard/modules/${slug}`
          const isActive = pathname.includes(slug)

          return (
            <Link key={item.label} href={href}>
              <Flex
                align="center"
                gap={3}
                w="full"
                py={5}
                px={collapsed ? 4 : 3}
                borderRadius="md"
                bg={isActive ? 'blue.50' : 'transparent'}
                _hover={{ bg: 'blue.50' }}
                transition="all 0.2s ease"
              >
                <Tooltip label={item.label} isDisabled={!collapsed} placement="right">
                  <Flex align="center" gap={collapsed ? 0 : 3}>
                    {item.icon}
                    {!collapsed && (
                      <Text fontSize="sm" fontWeight={isActive ? 'bold' : 'normal'} color="gray.800">
                        {item.label}
                      </Text>
                    )}
                  </Flex>
                </Tooltip>
              </Flex>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )
}

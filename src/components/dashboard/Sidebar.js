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
  HomeIcon,
} from 'lucide-react'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { label: 'Home', icon: <HomeIcon size={18} /> },
  { label: 'Purchase Order', icon: <PackageIcon size={18} /> },
  { label: 'Transfer Order', icon: <TruckIcon size={18} /> },
  { label: 'Movement Journal', icon: <WarehouseIcon size={18} /> },
  { label: 'Vendor Management', icon: <UsersIcon size={18} /> },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
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


      <Flex justify={collapsed ? 'center' : 'flex-end'} px={2} py={3}>
        <IconButton
          icon={collapsed ? <HamburgerIcon /> : <ChevronLeftIcon />}
          onClick={() => setCollapsed(!collapsed)}
          size="sm"
          variant="ghost"
          aria-label="Toggle Sidebar"
          borderRadius="full"
          bg="white"
          _hover={{ bg: 'gray.100' }}
        />
      </Flex>

      <VStack
        align="stretch"
        spacing={1}
        pt={2}
        pb={8}
        px={collapsed ? 2 : 3}
      >
        {navItems.map((item) => {
          const slug = item.label.toLowerCase().replace(/\s+/g, '') //to make folder name route better in view
          const href = slug === 'home' ? '/Dashboard' : `/Dashboard/modules/${slug}`
          const isActive = pathname === '/Dashboard' ? slug === 'home' : pathname.includes(slug) 

          return (
            <Link key={item.label} href={href}>
              <Tooltip
                label={item.label}
                isDisabled={!collapsed}
                placement="right"
                hasArrow
              >
                <Flex
                  align="center"
                  gap={collapsed ? 0 : 3}
                  py={2.5}
                  px={collapsed ? 3 : 4}
                  borderRadius="md"
                  bg={isActive ? 'blue.50' : 'transparent'}
                  _hover={{ bg: 'blue.100' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Box color={isActive ? 'blue.600' : 'gray.700'}>
                    {item.icon}
                  </Box>
                  {!collapsed && (
                    <Text
                      fontSize="sm"
                      fontWeight={isActive ? 'bold' : 'normal'}
                      color="gray.800"
                    >
                      {item.label}
                    </Text>
                  )}
                </Flex>
              </Tooltip>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )
}

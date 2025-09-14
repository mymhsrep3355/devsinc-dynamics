'use client'

import {
    Box,
    Flex,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    Avatar,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useBreakpointValue,
    chakra,
} from '@chakra-ui/react'
import { SearchIcon, BellIcon, SettingsIcon, QuestionIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const COMPANY_LIST = [
    { code: 'USMF', name: 'Contoso USA' },
    { code: 'DEMF', name: 'Demo Germany' },
    { code: 'FRMF', name: 'Fabrikam France' },
    { code: 'INMF', name: 'Initech Manufacturing' },
    { code: 'DAT', name: 'DAT Demo' }
]
export default function TopBar() {
    const [selectedCompany, setSelectedCompany] = useState(COMPANY_LIST[0])
    const searchWidth = useBreakpointValue({ base: '110px', sm: '200px', md: '320px', lg: '400px' })

    return (
        <Box
            bg="#0f1d3e"
            px={{ base: 2, sm: 2, md: 2 }}
            py={2}
            boxShadow="sm"
            position="sticky"
            top={0}
            zIndex={100}
            borderBottom="1px solid"
            borderColor="blue.900"
        >
            <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
                <Flex align="center" gap={2} minW="110px">
                    <Box fontSize="2xl" mr={2} as="span"></Box>
                    <Text
                        fontWeight="bold"
                        fontSize={{ base: 'md', sm: 'xl' }}
                        color="white"
                        letterSpacing="tight"
                        userSelect="none"
                    >
                        Finance & Operations
                    </Text>
                </Flex>

                <Box
                    flex="1"
                    maxW={searchWidth}
                    mx={{ base: 1, md: 4 }}
                    display={{ base: 'none', md: 'block' }}
                >
                    <InputGroup size="sm" bg="blue.900" borderRadius="lg">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search for a page"
                            border="none"
                            color="white"
                            _placeholder={{ color: 'gray.300' }}
                            borderRadius="lg"
                        />
                    </InputGroup>
                </Box>
                <Menu>
                    <MenuButton
                        as={ButtonBox}
                        w={{ base: '150px', sm: '320px' }}
                        //rightIcon={<ChevronDownIcon color="blue.700" />}
                        borderRadius="xl"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        fontWeight="semibold"
                        fontSize="sm"
                        color="blue.900"
                        boxShadow="sm"
                        px={3}
                        py={2}
                        transition="box-shadow 0.2s"
                        _hover={{ boxShadow: "md", borderColor: "blue.200", bg: "blue.50" }}
                        _active={{ bg: "blue.100" }}
                        _focus={{ outline: "none", borderColor: "blue.300" }}
                    >
                        <Flex align="center" justify="space-between" w="full">
                            <Text isTruncated fontSize="sm" fontWeight="semibold" color="blue.900">
                                {selectedCompany.code} | {selectedCompany.name}
                            </Text>
                            <ChevronDownIcon color="blue.700" />
                        </Flex>
                    </MenuButton>
                    <MenuList borderRadius="xl" py={2} px={0}>
                        {COMPANY_LIST.map((company) => (
                            <MenuItem
                                key={company.code}
                                borderRadius="lg"
                                px={4}
                                py={2}
                                fontWeight={selectedCompany.code === company.code ? 'bold' : 'normal'}
                                bg={selectedCompany.code === company.code ? "blue.50" : "white"}
                                color={selectedCompany.code === company.code ? "blue.800" : "gray.800"}
                                onClick={() => setSelectedCompany(company)}
                                _hover={{ bg: "blue.50" }}
                            >
                                <Text fontSize="sm">
                                    {company.code} &ndash; {company.name}
                                </Text>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>


                <Flex align="center" gap={1}>
                    <IconButton
                        aria-label="Notifications"
                        icon={<BellIcon />}
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'blue.800' }}
                        fontSize="xl"
                        size="md"
                    />
                    <IconButton
                        aria-label="Settings"
                        icon={<SettingsIcon />}
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'blue.800' }}
                        fontSize="xl"
                        size="md"
                        display={{ base: 'none', md: 'inline-flex' }}
                    />
                    <IconButton
                        aria-label="Help"
                        icon={<QuestionIcon />}
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'blue.800' }}
                        fontSize="xl"
                        size="md"
                        display={{ base: 'none', md: 'inline-flex' }}
                    />

                    <Menu placement="bottom-end">
                        <MenuButton
                            as={Flex}
                            align="center"
                            cursor="pointer"
                            borderRadius="full"
                            ml={2}
                            px={2}
                            _hover={{ bg: 'blue.900' }}
                            minW="40px"
                            gap={2}
                        >
                            <Avatar size="sm" name="D3" bg="blue.400" color="white" />
                            <ChevronDownIcon color="white" fontSize="md" display={{ base: 'none', sm: 'inline' }} />
                        </MenuButton>
                        <MenuList minW="220px" borderRadius="xl" py={2} px={0}>
                            <Box px={4} pt={2} pb={1}>
                                <Text fontWeight="bold" fontSize="sm" color="blue.800">
                                    Dynamics User
                                </Text>
                                <Text fontSize="xs" color="gray.500" mb={1}>
                                    d365@company.com
                                </Text>
                            </Box>
                            <MenuDivider />
                            <MenuItem
                                color="red.600"
                                fontWeight="semibold"
                                onClick={() => alert('Logged out')}
                                borderRadius="lg"
                                px={4}
                            >
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}

const ButtonBox = chakra('button', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        background: 'none'
    }
});

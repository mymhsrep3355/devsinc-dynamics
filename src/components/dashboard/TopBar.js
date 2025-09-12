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
} from '@chakra-ui/react'
import { SearchIcon, BellIcon, SettingsIcon, QuestionIcon } from '@chakra-ui/icons'

export default function TopBar() {
    return (
        <Box bg="#001433" px={4} py={2} boxShadow="sm" position="sticky" top={0} zIndex={100} >
            <Flex align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="medium" color="white">
                    Finance and Operations
                </Text>
                <Flex align="center" gap={4}>

                    <InputGroup size="sm" bg="blue.900" borderRadius="md" width="500px">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search for a page"
                            border="none"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                        />
                    </InputGroup>
                </Flex>

                <Flex align="center" gap={3}>
                    <Text fontSize="sm" px={2} py={1} bg="white" borderRadius="md" color="blue.800">
                        USMF | Contoso Entertainment System USA
                    </Text>
                    <IconButton aria-label="Notifications" icon={<BellIcon />} variant="ghost" color="white" />
                    <IconButton aria-label="Settings" icon={<SettingsIcon />} variant="ghost" color="white" />
                    <IconButton aria-label="Help" icon={<QuestionIcon />} variant="ghost" color="white" />
                    <Avatar size="sm" name="D3" bg="blue.300" color="white" />
                </Flex>
            </Flex>
        </Box>
    )
}

'use client'

import { AddIcon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'

export default function AddNew({ onClick }) {
    return (
        <Button
            leftIcon={<AddIcon />}
            variant="ghost"
            color="blue.500"
            fontWeight="normal"
            onClick={onClick}
            _hover={{ textDecoration: 'underline' }}
        >
            New
        </Button>
    )
}
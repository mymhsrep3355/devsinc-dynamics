'use client'

import { Box, Heading } from '@chakra-ui/react'

export default function HeaderCompanyInfo() {
  return (
    <Box
      bgImage="url('/Images/Banner.jpg')"
      bgSize="cover"
      bgPosition="center"
      height="160px"
      display="flex"
      alignItems="flex-end"
      px={8}
      pb={4}
    >
      <Heading color="white" fontSize="2xl">
        Contoso Entertainment System USA
      </Heading>
    </Box>
  )
}

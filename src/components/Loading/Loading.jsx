'use client'

import { Box, Center, VStack, Image, Text, Spinner } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionText = motion(Text)

export default function Loading() {
  return (
    <Center
      minH="100vh"
      flexDirection="column"
      textAlign="center"
      bg="white"
      px={4}
    >

      <VStack spacing={4} mb={10}>
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src="/Images/d365.png" 
            alt="Dynamics Logo"
            boxSize={{ base: '90px', md: '110px' }}
          />
        </MotionBox>

        <MotionText
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="semibold"
          color="gray.800"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Finance and Operations
        </MotionText>

        <MotionText
          fontSize={{ base: 'md', md: 'lg' }}
          color="gray.600"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Dynamics 365
        </MotionText>
      </VStack>

      <MotionBox
        mb={16}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Spinner
          thickness="1px"
          speed="0.7s"
          emptyColor="gray.200"
          color="blue.800"
          size="md"
        />
      </MotionBox>

      <MotionBox
        position="absolute"
        bottom={6}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Image
          src="/Images/ms-logo.png"
          alt="Microsoft"
          h={{ base: '16px', md: '20px' }}
        />
      </MotionBox>
    </Center>
  )
}

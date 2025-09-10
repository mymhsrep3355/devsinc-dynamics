'use client'

import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function AuthCard({ onLogin, onSignup }) {
  const [isSignup, setIsSignup] = useState(false)
  const formWidth = useBreakpointValue({ base: '95%', sm: '80%', md: '420px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    // if (isSignup) {
    //   const confirmPassword = formData.get('confirmPassword')
    //   if (password !== confirmPassword) {
    //     alert('Passwords do not match!')
    //     return
    //   }
    //   onSignup?.({ email, password })
    // } else {
    //   onLogin?.({ email, password })
    // }
  }

  return (
    <Box
      w={formWidth}
      bg="rgba(255, 255, 255, 0.08)"
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(14px) saturate(180%)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      _hover={{
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
        transition: 'all 0.3s ease-in-out',
      }}
      suppressHydrationWarning
    >
      <Heading
        size="lg"
        mb={6}
        // color={"white"}
        textAlign="center"
        bgColor={"white"}
        bgClip="text"
        fontWeight="extrabold"
        letterSpacing="tight"
      >
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </Heading>

      <VStack spacing={5} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel color="gray.200" fontWeight="medium">
            Email
          </FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
            focusBorderColor="blue.300"
            bg="rgba(255,255,255,0.15)"
            border="1px solid rgba(255,255,255,0.3)"
            _placeholder={{ color: 'gray.300' }}
            color="white"
          />
        </FormControl>


        <FormControl isRequired>
          <FormLabel color="gray.200" fontWeight="medium">
            Password
          </FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            name="password"
            focusBorderColor="blue.300"
            bg="rgba(255,255,255,0.15)"
            border="1px solid rgba(255,255,255,0.3)"
            _placeholder={{ color: 'gray.300' }}
            color="white"
          />
        </FormControl>


        <Button
          type="submit"
          w="full"
          size="lg"
          borderRadius="full"
          bgGradient="linear(to-r, teal.600, teal.500, teal.600)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, teal.600, teal.500, teal.600)",
            transform: 'scale(1.02)',
          }}
          transition="all 0.2s ease-in-out"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
      </VStack>

      <Divider my={6} borderColor="whiteAlpha.400" />

      <Text fontSize="sm" textAlign="center" color="gray.200">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Button
          variant="link"
          color="teal.200"
          fontWeight="bold"
          onClick={() => setIsSignup(!isSignup)}
          _hover={{ color: 'blue.300', textDecoration: 'underline' }}
        >
          {isSignup ? 'Log in' : 'Sign up'}
        </Button>
      </Text>
    </Box>
  )
}

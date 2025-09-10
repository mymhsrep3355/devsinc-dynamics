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

  const [loginValues, setLoginValues] = useState({ email: '', password: '' })
  const [signupValues, setSignupValues] = useState({ email: '', password: '', confirmPassword: '' })

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    onLogin?.(loginValues)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const { email, password} = signupValues;
    onSignup?.({ email, password })
  }

  return (
    <Box
      w={formWidth}
      //bg="rgba(255, 255, 255, 0.08)"
      bg={"white"}
      p={{ base: 8, md: 10 }}
      borderRadius="2xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
    //   backdropFilter="blur(14px) saturate(180%)"
      border="1px solid rgba(255, 255, 255, 0.2)"
    //   _hover={{
    //     boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
    //     transition: 'all 0.3s ease-in-out',
    //   }}
      suppressHydrationWarning
    >
      <Heading
        size="lg"
        mb={6}
        textAlign="center"
        color="black"
        fontWeight="extrabold"
        letterSpacing="tight"
      >
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </Heading>

      {isSignup ? (
        <VStack spacing={5} as="form" onSubmit={handleSignupSubmit}>
          <FormControl isRequired>
            <FormLabel color="black">Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={signupValues.email}
              onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value })}
              focusBorderColor="blue.300"
              bg="rgba(255,255,255,0.15)"
              border="1px solid rgba(0, 0, 0, 0.3)"
              _placeholder={{ color: 'gray.500' }}
              color="black"
              suppressHydrationWarning
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="black">Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={signupValues.password}
              onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
              focusBorderColor="blue.300"
              bg="rgba(255,255,255,0.15)"
              border="1px solid rgba(0, 0, 0, 0.3)"
              _placeholder={{ color: 'gray.500' }}
              color="black"
              suppressHydrationWarning
            />
          </FormControl>

    
          <Button
            type="submit"
            w="full"
            size="lg"
            borderRadius="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
            Sign Up
          </Button>
        </VStack>
      ) : (
        <VStack spacing={5} as="form" onSubmit={handleLoginSubmit}>
          <FormControl isRequired>
            <FormLabel color="black">Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={loginValues.email}
              onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
              focusBorderColor="blue.300"
              bg="rgba(255,255,255,0.15)"
              border="1px solid rgba(0, 0, 0, 0.3)"
              _placeholder={{ color: 'gray.500' }}
              color="black"
              suppressHydrationWarning
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="black">Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginValues.password}
              onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
              focusBorderColor="blue.300"
              bg="rgba(255,255,255,0.15)"
              border="1px solid rgba(0, 0, 0, 0.3)"
              _placeholder={{ color: 'gray.500' }}
              color="black"
              suppressHydrationWarning
            />
          </FormControl>

          <Button
            type="submit"
            w="full"
            size="lg"
            borderRadius="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
            Login
          </Button>
        </VStack>
      )}

      <Divider my={6} borderColor="whiteAlpha.400" />

      <Text fontSize="sm" textAlign="center" color="gray.500">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Button
          variant="link"
          color="blue.200"
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

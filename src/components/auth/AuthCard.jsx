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
  const formWidth = useBreakpointValue({ base: '90%', sm: '400px', md: '500px' })

  const [loginValues, setLoginValues] = useState({ email: '', password: '' })
  const [signupValues, setSignupValues] = useState({ email: '', password: '', confirmPassword: '' })

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    onLogin?.(loginValues)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const { email, password } = signupValues
    onSignup?.({ email, password })
  }

  return (
    <Box
      w={formWidth}
      bg="white"
      px={{ base: 8, md: 10 }}
      py={12}
      border="1px solid"
      borderColor="gray.200"
      boxShadow="md"
    >
      <Heading
        size="lg"
        mb={8}
        textAlign="center"
        color="gray.800"
        fontWeight="bold"
        letterSpacing="-0.5px"
      >
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </Heading>

      {isSignup ? (
        <VStack spacing={6} as="form" onSubmit={handleSignupSubmit}>
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.700">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={signupValues.email}
              onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value })}
              focusBorderColor="blue.500"
              size="md"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.700">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={signupValues.password}
              onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
              focusBorderColor="blue.500"
              size="md"
            />
          </FormControl>

          <Button
            type="submit"
            w="full"
            size="md"
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            fontWeight="semibold"
          >
            Sign Up
          </Button>
        </VStack>
      ) : (
        <VStack spacing={6} as="form" onSubmit={handleLoginSubmit}>
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.700">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={loginValues.email}
              onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
              focusBorderColor="blue.500"
              size="md"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.700">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={loginValues.password}
              onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
              focusBorderColor="blue.500"
              size="md"
            />
          </FormControl>

          <Button
            type="submit"
            w="full"
            size="md"
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            fontWeight="semibold"
          >
            Login
          </Button>
        </VStack>
      )}

      <Divider my={8} borderColor="gray.200" />

      <Text fontSize="sm" textAlign="center" color="gray.600">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Button
          variant="link"
          color="blue.600"
          fontWeight="medium"
          onClick={() => setIsSignup(!isSignup)}
          _hover={{ textDecoration: 'underline' }}
        >
          {isSignup ? 'Log in' : 'Sign up'}
        </Button>
      </Text>
    </Box>
  )
}

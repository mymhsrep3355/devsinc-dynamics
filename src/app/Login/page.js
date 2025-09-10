'use client'

import AuthCard from '@/components/auth/AuthCard'
import { Box, Center } from '@chakra-ui/react'
import LoadingPage from '../Loading/page';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 


export default function LoginPage() {
    const [Loading, setLoading] = useState(false);
    const router = useRouter()

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        console.log('Login API call ', { email, password });
        await new Promise((resolve) => setTimeout(resolve, 4000));
        router.push('/Dashboard'); 

    }

    const handleSignup = async ({ email, password }) => {
        console.log('Signup API call ', { email, password })

    }

    if (Loading) {
        return <LoadingPage />;
    }

    return (
        <Box
            minH="100vh"
            bgImage="url('https://images.unsplash.com/photo-1580983559367-0dc2f8934365?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" // place in /public
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            suppressHydrationWarning
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bg="blackAlpha.600"
                zIndex={1}
            />
            <Center minH="100vh" zIndex={2} position="relative" px={4}>
                <AuthCard onLogin={handleLogin} onSignup={handleSignup} />
            </Center>
        </Box>
    )
}

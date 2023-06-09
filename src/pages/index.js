import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, Center, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, Stack } from '@chakra-ui/react'
import { useLoginMutation } from '@/redux/feature/authApiSlice'
import { useEffect, useState } from 'react'
import { setCredentials } from '@/redux/feature/authSlice'
import { persistor, store } from '@/redux/store'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [login, { isLoading }] = useLoginMutation()
  const [loginForm, setloginForm] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const router = useRouter();
  const state = useSelector((state) => state.auth.token)
  useEffect(() => {
    if (state) {
      router.push('/customer');
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const { email, password } = loginForm
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials(userData))
      router.push('/customer')
      setloginForm({ email: '', password: '' })
    } catch (error) {
      toast.error(error.data.error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setloginForm({ ...loginForm, [name]: value })
  }
  return (
    <>
      <Head>
        <title>Endlos RVM</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Center h="100vh" px='5'>
          <Box p={8} borderWidth={1} borderRadius="md" boxShadow="dark-lg" maxW="500px" w="100%">
            <Center ><Image src='https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg' h='28 ' /></Center>
            <form>
              <FormControl id="email" mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' value={loginForm.email} onChange={handleChange} />
              </FormControl>

              <FormControl id="password" mb={6}>
                <FormLabel>Password</FormLabel>
                <Input name='password' value={loginForm.password} onChange={handleChange} type="password" />
              </FormControl>

              <Button 
              isLoading ={isLoading}
              loadingText='Please wait'
               onClick={() => handleSubmit()} colorScheme="blue" size="lg" w="100%">
                Log In
              </Button>
            </form>
          </Box>
        </Center>
      </main>
    </>
  )
}

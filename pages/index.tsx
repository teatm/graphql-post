import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Heading, Stack } from '@chakra-ui/react'
import PostList from '../components/PostList'
import PostCreate from '../components/PostCreate'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Post App</title>
        <meta name="description" content="post app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container my='32px'>
          <Stack spacing='32px'>
            <Heading>Posts</Heading>
            <PostCreate />
            <PostList />
          </Stack>
        </Container>
      </main>
    </div>
  )
}

export default Home
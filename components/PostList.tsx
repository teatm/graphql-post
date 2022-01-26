import { gql, useQuery } from '@apollo/client'
import { List, ListItem, Box } from '@chakra-ui/react'

export const AllPostsQuery = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`

const PostList: React.FC = () => {
  const { data, loading, error } = useQuery(AllPostsQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message} </p>

  return (
    <List>
      {
        data.posts.map(post => (
          <ListItem key={post.id} >
            <Box maxW='Base' borderWidth='1px' borderRadius='lg'>
              <Box p='4'>
                <Box
                  mt='1'
                  fontWeight='semibold'
                  fontSize='30px'
                  as='h4'
                  lineHeight='tight'
                  isTruncated
                >
                  {post.title}
                </Box>
                {post.content}
              </Box>
            </Box>
          </ListItem>
        ))
      }
    </List>
  )
}

export default PostList
import { gql, useQuery } from '@apollo/client'
import { List, ListItem, Box, Collapse, IconButton, Tag } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export const AllPostsQuery = gql`
  query {
    posts {
      id
      title
      content
      comments {
        id
        content
        postId
      }
    }
  }
`

const PostList: React.FC = () => {
  const { data, loading, error } = useQuery(AllPostsQuery)
  const [show, setShow] = useState(false);


  const handleToggle = () => setShow(!show);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message} </p>



  return (
    <List>
      {
        data.posts.map(post => (
          <ListItem key={post.id} mb='2'>
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
                <Box mt='2' mb='2'>
                  {post.content}
                </Box>
                <Box>
                  <IconButton aria-label='comment' icon={<ChatIcon />} onClick={handleToggle} />
                  <Collapse in={show}>
                    {post.comments.map((comment, index) => (<Tag key={index} mt='2' mr='2'>{comment.content}</Tag>))}
                  </Collapse>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))
      }
    </List>
  )
}

export default PostList
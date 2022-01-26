import { Formik, Field, Form } from 'formik'
import { Stack, FormControl, Input, Button, Textarea } from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { AllPostsQuery } from './PostList'

const CreatePostMutaiton = gql`
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      id
      title
      content
    }
  }
`

const PostCreate: React.FC = () => {
    const [createPost, { error }] = useMutation(CreatePostMutaiton, {
        refetchQueries: [AllPostsQuery],
    })

    const handleSubmit = (title: string, resetForm: () => void) => {
        console.log(title)
        if (!title) return
        console.log('cc')
        createPost({
            variables: {
                title: title
            },
        })
        resetForm()
    }

    if (error) return <p>Error: {error.message}</p>

    return (
        <Formik
            initialValues={{ title: '' }}
            onSubmit={(value, actions) => handleSubmit(value.title, actions.resetForm)}
        >
            <Form>
                <Stack direction='row'>
                    <Field name='post'>
                        {({ field }) => (
                            <FormControl>
                                <Input {...field} id='title' type='text' placeholder='Title...' />
                            </FormControl>
                        )}
                    </Field>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Formik>
    )
}

export default PostCreate
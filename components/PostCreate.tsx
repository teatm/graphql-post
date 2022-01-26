import { Formik, Field, Form } from 'formik'
import { Stack, Input, Button, Textarea } from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { AllPostsQuery } from './PostList'

const CreatePostMutaiton = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
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

    const handleSubmit = (title: string, content: string, resetForm: () => void) => {
        if (!title) return
        createPost({
            variables: {
                title: title,
                content: content
            },
        })
        resetForm()
    }

    if (error) return <p>Error: {error.message}</p>

    return (
        <Formik
            initialValues={{ title: '', content: '' }}
            onSubmit={(value, actions) => handleSubmit(value.title, value.content, actions.resetForm)}
        >
            <Form>
                <Field name='title'>
                    {({ field }) => (
                        <Input {...field} id='title' type='text' placeholder='Title...' mb='2' />
                    )}
                </Field>
                <Field name='content'>
                    {({ field }) => (
                        <Textarea {...field} id='content' type='text' placeholder='Content...' mb='2' />
                    )}
                </Field>
                <Button type='submit' mb='2'>
                    Submit
                </Button>
            </Form>
        </Formik>
    )
}

export default PostCreate
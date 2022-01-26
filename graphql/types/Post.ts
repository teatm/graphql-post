import { objectType, extendType, stringArg, nonNull } from 'nexus'

export const CreatePostMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createPost', {
            type: 'Post',
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.post.create({
                    data: {
                        title: args.title,
                        content: args.content
                    }
                })
            }
        })
    }
})

export const Post = objectType({
    name: 'Post',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('title')
        t.nonNull.string('content')
    },
})

export const PostsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('posts', {
            type: 'Post',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.post.findMany()
            },
        })
    },
})
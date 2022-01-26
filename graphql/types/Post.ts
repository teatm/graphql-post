import { objectType, extendType, stringArg, nonNull, queryType } from 'nexus'

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
        t.list.field('comments', {
            type: 'Comment',
            resolve(root, _, ctx) {
                return ctx.prisma.comment.findMany({
                    where: {
                        postId: root.id,
                    },
                })
            },
        })
    },
})

export const PostsQuery = queryType({
    definition(t) {
        t.nonNull.list.field('posts', {
            type: 'Post',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.post.findMany()
            },
        })
    },
})
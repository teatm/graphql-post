import { objectType, extendType } from 'nexus'

export const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.int('postId')
        t.nonNull.string('content')
    },
})

export const CommentsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('comments', {
            type: 'Comment',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.comment.findMany()
            },
        })
    },
})


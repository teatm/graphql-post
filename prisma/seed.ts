import { prisma } from '../lib/prisma'

const main = async () => {
    await prisma.task.createMany({
        data: [
            { title: 'laundry', done: true },
            { title: 'dish washing', done: true },
            { title: 'house cleaning', done: false },
        ]
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
import { prisma } from "../../lib/prisma";

async function main() {
    try {
        await prisma.level.createMany({
            data: [
                {orderIndex: 1, imageId: 1},
                {orderIndex: 2, imageId: 2},
                {orderIndex: 3, imageId: 3},
            ],
        });

        console.log('Levels seeded successfully!');
    } catch (error) {
        console.error(
            '------------------Initialization Error------------------',
        );
        console.error(error);
        console.error(
            '------------------Initialization Error------------------',
        );
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

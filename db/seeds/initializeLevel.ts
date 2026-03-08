import { prisma } from '../../lib/prisma';

export default async function initializeLevel() {
    try {
        await prisma.level.createMany({
            data: [
                { orderIndex: 1, imageId: 1 },
                { orderIndex: 2, imageId: 2 },
                { orderIndex: 3, imageId: 3 },
            ],
            skipDuplicates: true,
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

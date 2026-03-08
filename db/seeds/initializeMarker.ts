import { prisma } from '../../lib/prisma';

async function main() {
    try {
        await prisma.marker.createMany({
            data: [
                { height: 10, width: 10, breakpointId: 1, levelId: 1 },
                { height: 10, width: 10, breakpointId: 1, levelId: 2 },
                { height: 8, width: 8, breakpointId: 1, levelId: 3 },

                { height: 16, width: 16, breakpointId: 2, levelId: 1 },
                { height: 14, width: 14, breakpointId: 2, levelId: 2 },
                { height: 10, width: 10, breakpointId: 2, levelId: 3 },

                { height: 18, width: 18, breakpointId: 3, levelId: 1 },
                { height: 18, width: 18, breakpointId: 3, levelId: 2 },
                { height: 12, width: 12, breakpointId: 3, levelId: 3 },

                { height: 20, width: 20, breakpointId: 4, levelId: 1 },
                { height: 20, width: 20, breakpointId: 4, levelId: 2 },
                { height: 16, width: 16, breakpointId: 4, levelId: 3 },

                { height: 26, width: 26, breakpointId: 5, levelId: 1 },
                { height: 22, width: 22, breakpointId: 5, levelId: 2 },
                { height: 18, width: 18, breakpointId: 5, levelId: 3 },
            ],
        });

        console.log('Markers seeded successfully!');
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

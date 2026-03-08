import { prisma } from "../../lib/prisma";

async function main() {
    try {
        await prisma.breakpoint.createMany({
            data: [
                {minimumWidthPx: 0, maximumWidthPx: 639},
                {minimumWidthPx: 640, maximumWidthPx: 767},
                {minimumWidthPx: 768, maximumWidthPx: 1023},
                {minimumWidthPx: 1024, maximumWidthPx: 1279},
                {minimumWidthPx: 1280, maximumWidthPx: 999999},
            ],
        });

        console.log('Breakpoints seeded successfully!');
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

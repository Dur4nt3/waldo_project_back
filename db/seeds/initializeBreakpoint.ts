import { prisma } from '../../lib/prisma';

export default async function initializeBreakpoint() {
    try {
        await prisma.breakpoint.createMany({
            data: [
                { minimumWidthPx: 0, maximumWidthPx: 639 },
                { minimumWidthPx: 640, maximumWidthPx: 767 },
                { minimumWidthPx: 768, maximumWidthPx: 1023 },
                { minimumWidthPx: 1024, maximumWidthPx: 1279 },
                { minimumWidthPx: 1280, maximumWidthPx: 999999 },
            ],
            skipDuplicates: true,
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

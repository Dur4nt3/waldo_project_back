import { prisma } from "../../lib/prisma";

async function main() {
    try {
        await prisma.characterLocation.createMany({
            data: [
                {},
            ],
        });

        console.log('Character locations seeded successfully!');
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

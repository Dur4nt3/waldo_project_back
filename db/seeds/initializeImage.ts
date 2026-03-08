import { prisma } from "../../lib/prisma";

async function main() {
    try {
        await prisma.image.createMany({
            data: [
                { name: 'rick-morty', description: 'Rick and Morty image, find Pencilvester and Summer.' },
                { name: 'breaking-bad', description: 'Breaking Bad image, find Walter White and Saul Goodman.' },
                { name: 'one-piece', description: 'One Piece image, find Luffy and Wally.' }
            ],
            skipDuplicates: true,
        });

        console.log('Images seeded successfully!');
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

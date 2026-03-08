import { prisma } from '../../lib/prisma';

export default async function initializeCharacter() {
    try {
        await prisma.character.createMany({
            data: [
                {
                    name: 'Pencilvester',
                    description: 'He is a pencil...',
                    imageId: 1,
                },
                {
                    name: 'Summer',
                    description: 'Red haired girl with a pink shirt.',
                    imageId: 1,
                },
                {
                    name: 'Walter White',
                    description: 'Old man with sunglasses and a black fedora.',
                    imageId: 2,
                },
                {
                    name: 'Saul Goodman',
                    description:
                        'A man with a suit, red tie and yellow-ish shirt.',
                    imageId: 2,
                },
                {
                    name: 'Luffy',
                    description: 'Has a straw hat and a flaming fist.',
                    imageId: 3,
                },
                {
                    name: 'Wally',
                    description:
                        'Has a red and white striped shirt and hat, glasses, and NO facial hair.',
                    imageId: 3,
                },
            ],

            skipDuplicates: true,
        });

        console.log('Characters seeded successfully!');
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

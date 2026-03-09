import { prisma } from '../../lib/prisma';

import initializeImage from './initializeImage';
import initializeCharacter from './initializeCharacter';
import initializeLevel from './initializeLevel';
import initializeBreakpoint from './initializeBreakpoint';
import initializeMarker from './initializeMarker';
import initializeCharacterLocation from './initializeCharacterLocation';

async function main() {
    console.log('Seeding images and breakpoints...');
    await Promise.all([initializeImage(), initializeBreakpoint()]);

    console.log('Seeding levels and characters...');
    await Promise.all([initializeLevel(), initializeCharacter()]);

    console.log('Seeding markers and character locations...');
    await Promise.all([initializeMarker(), initializeCharacterLocation()]);
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

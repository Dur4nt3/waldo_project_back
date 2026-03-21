import { prisma } from '../../../lib/prisma';

export default async function truncateAllTables() {
    await prisma.$executeRaw`
        TRUNCATE TABLE
            "GameProgress",
            "Marker",
            "CharacterLocation",
            "GameSession",
            "Character",
            "Level",
            "Player",
            "Image",
            "Breakpoint"
        RESTART IDENTITY CASCADE
    `;

    console.log('All tables truncated successfully.');
}
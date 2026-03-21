import initializeImage from '../../../db/seeds/initializeImage';
import initializeCharacter from '../../../db/seeds/initializeCharacter';
import initializeLevel from '../../../db/seeds/initializeLevel';
import initializeBreakpoint from '../../../db/seeds/initializeBreakpoint';
import initializeMarker from '../../../db/seeds/initializeMarker';
import initializeCharacterLocation from '../../../db/seeds/initializeCharacterLocation';

export default async function seedAll() {
    await Promise.all([initializeImage(), initializeBreakpoint()]);
    await Promise.all([initializeLevel(), initializeCharacter()]);
    await Promise.all([initializeMarker(), initializeCharacterLocation()]);

    console.log('Seeding complete!');
}
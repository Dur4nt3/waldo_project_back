-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_imageId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterLocation" DROP CONSTRAINT "CharacterLocation_breakpointId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterLocation" DROP CONSTRAINT "CharacterLocation_characterId_fkey";

-- DropForeignKey
ALTER TABLE "GameProgress" DROP CONSTRAINT "GameProgress_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_breakpointId_fkey";

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_breakpointId_fkey" FOREIGN KEY ("breakpointId") REFERENCES "Breakpoint"("breakpointId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_breakpointId_fkey" FOREIGN KEY ("breakpointId") REFERENCES "Breakpoint"("breakpointId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("gameSessionId") ON DELETE CASCADE ON UPDATE CASCADE;

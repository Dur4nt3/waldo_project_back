/*
  Warnings:

  - A unique constraint covering the columns `[name,imageId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId,breakpointId]` on the table `CharacterLocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelId,breakpointId]` on the table `Marker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_name_imageId_key" ON "Character"("name", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterLocation_characterId_breakpointId_key" ON "CharacterLocation"("characterId", "breakpointId");

-- CreateIndex
CREATE UNIQUE INDEX "Marker_levelId_breakpointId_key" ON "Marker"("levelId", "breakpointId");

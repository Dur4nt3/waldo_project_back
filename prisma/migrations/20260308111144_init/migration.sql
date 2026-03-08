-- CreateTable
CREATE TABLE "Player" (
    "playerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "gameSessionId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionToken" TEXT NOT NULL,
    "levelCount" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "breakpointId" INTEGER NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("gameSessionId")
);

-- CreateTable
CREATE TABLE "Image" (
    "imageId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "Character" (
    "characterId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("characterId")
);

-- CreateTable
CREATE TABLE "CharacterLocation" (
    "characterLocationId" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "breakpointId" INTEGER NOT NULL,
    "xMin" DOUBLE PRECISION NOT NULL,
    "xMax" DOUBLE PRECISION NOT NULL,
    "yMin" DOUBLE PRECISION NOT NULL,
    "yMax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CharacterLocation_pkey" PRIMARY KEY ("characterLocationId")
);

-- CreateTable
CREATE TABLE "Level" (
    "levelId" SERIAL NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("levelId")
);

-- CreateTable
CREATE TABLE "Breakpoint" (
    "breakpointId" SERIAL NOT NULL,
    "minimumWidthPx" INTEGER NOT NULL,
    "maximumWidthPx" INTEGER NOT NULL,

    CONSTRAINT "Breakpoint_pkey" PRIMARY KEY ("breakpointId")
);

-- CreateTable
CREATE TABLE "Marker" (
    "markerId" SERIAL NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "breakpointId" INTEGER NOT NULL,

    CONSTRAINT "Marker_pkey" PRIMARY KEY ("markerId")
);

-- CreateTable
CREATE TABLE "GameProgress" (
    "gameProgressId" SERIAL NOT NULL,
    "levelId" INTEGER NOT NULL,
    "gameSessionId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameProgress_pkey" PRIMARY KEY ("gameProgressId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_playerId_key" ON "GameSession"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Level_orderIndex_key" ON "Level"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Level_imageId_key" ON "Level"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Breakpoint_minimumWidthPx_key" ON "Breakpoint"("minimumWidthPx");

-- CreateIndex
CREATE UNIQUE INDEX "Breakpoint_maximumWidthPx_key" ON "Breakpoint"("maximumWidthPx");

-- CreateIndex
CREATE UNIQUE INDEX "Marker_breakpointId_key" ON "Marker"("breakpointId");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_breakpointId_fkey" FOREIGN KEY ("breakpointId") REFERENCES "Breakpoint"("breakpointId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_breakpointId_fkey" FOREIGN KEY ("breakpointId") REFERENCES "Breakpoint"("breakpointId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_breakpointId_fkey" FOREIGN KEY ("breakpointId") REFERENCES "Breakpoint"("breakpointId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("levelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("gameSessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

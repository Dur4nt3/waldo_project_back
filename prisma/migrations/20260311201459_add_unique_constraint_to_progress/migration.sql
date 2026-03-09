/*
  Warnings:

  - A unique constraint covering the columns `[gameSessionId,levelId]` on the table `GameProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameProgress_gameSessionId_levelId_key" ON "GameProgress"("gameSessionId", "levelId");

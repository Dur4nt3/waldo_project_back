/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameSession_sessionToken_key" ON "GameSession"("sessionToken");

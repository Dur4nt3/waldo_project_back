/*
  Warnings:

  - Added the required column `levelId` to the `Marker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marker" ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("levelId") ON DELETE RESTRICT ON UPDATE CASCADE;

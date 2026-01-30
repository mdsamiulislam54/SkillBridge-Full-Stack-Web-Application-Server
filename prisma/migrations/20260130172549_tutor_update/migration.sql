/*
  Warnings:

  - You are about to drop the column `day` on the `TutorSlot` table. All the data in the column will be lost.
  - Added the required column `duration` to the `TutorSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxStudents` to the `TutorSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TutorSlot" DROP COLUMN "day",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxStudents" TEXT NOT NULL;

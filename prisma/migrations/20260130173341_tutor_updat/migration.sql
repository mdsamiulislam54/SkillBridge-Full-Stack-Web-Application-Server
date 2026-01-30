/*
  Warnings:

  - Added the required column `teachingMode` to the `TutorSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TutorSlot" ADD COLUMN     "teachingMode" TEXT NOT NULL;

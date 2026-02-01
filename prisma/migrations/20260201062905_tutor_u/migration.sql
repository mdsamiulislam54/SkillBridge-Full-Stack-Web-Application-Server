/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tutorProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'TUTOR';

-- CreateIndex
CREATE UNIQUE INDEX "tutorProfile_userId_key" ON "tutorProfile"("userId");

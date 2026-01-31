/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tutorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "TutorSlot" DROP CONSTRAINT "TutorSlot_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "tutors" DROP CONSTRAINT "tutors_userId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "TutorSlot";

-- DropTable
DROP TABLE "tutors";

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "tutorSlotsId" TEXT NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "totalPrice" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "teachingMode" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "averageRating" DOUBLE PRECISION DEFAULT 0.0,
    "profileImage" TEXT,
    "languages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorSlots" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "teachingMode" TEXT NOT NULL,
    "maxStudent" INTEGER NOT NULL,
    "hourlyRate" INTEGER NOT NULL,
    "category" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutorSlots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_bookingId_key" ON "review"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "tutorProfile_userId_key" ON "tutorProfile"("userId");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorSlotsId_fkey" FOREIGN KEY ("tutorSlotsId") REFERENCES "tutorSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorProfile" ADD CONSTRAINT "tutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorSlots" ADD CONSTRAINT "tutorSlots_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

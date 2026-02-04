-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_tutorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_tutorSlotsId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_tutorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "tutorProfile" DROP CONSTRAINT "tutorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "tutorSlots" DROP CONSTRAINT "tutorSlots_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorSlotsId_fkey" FOREIGN KEY ("tutorSlotsId") REFERENCES "tutorSlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorProfile" ADD CONSTRAINT "tutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorSlots" ADD CONSTRAINT "tutorSlots_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

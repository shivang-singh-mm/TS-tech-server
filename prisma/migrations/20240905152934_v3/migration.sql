/*
  Warnings:

  - You are about to drop the column `postId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `notificationType` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redirectId` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `notification` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "NOTIFICATIONTYPE" AS ENUM ('POST', 'COMMENT', 'FOLLOW');

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_postId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "postId",
ADD COLUMN     "notificationType" "NOTIFICATIONTYPE" NOT NULL,
ADD COLUMN     "redirectId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

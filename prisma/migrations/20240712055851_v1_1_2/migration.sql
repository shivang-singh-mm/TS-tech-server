/*
  Warnings:

  - You are about to drop the column `commentedBy` on the `commentPost` table. All the data in the column will be lost.
  - You are about to drop the column `commentedOn` on the `commentPost` table. All the data in the column will be lost.
  - Added the required column `userId` to the `commentPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commentPost" DROP CONSTRAINT "commentPost_commentedBy_fkey";

-- AlterTable
ALTER TABLE "commentPost" DROP COLUMN "commentedBy",
DROP COLUMN "commentedOn",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "commentPost" ADD CONSTRAINT "commentPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `postedBy` on the `post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_postedBy_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "postedBy",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

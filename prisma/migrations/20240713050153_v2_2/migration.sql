/*
  Warnings:

  - You are about to drop the column `commentId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_commentId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "commentId",
ADD COLUMN     "parentCommentId" TEXT;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

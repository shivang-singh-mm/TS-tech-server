/*
  Warnings:

  - You are about to drop the column `mentionId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `date` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mention` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_mentionId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "mentionId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mention" TEXT NOT NULL;

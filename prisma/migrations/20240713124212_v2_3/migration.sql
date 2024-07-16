/*
  Warnings:

  - Added the required column `commentType` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeType` to the `like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "COMMENTTYPES" AS ENUM ('POST', 'COMMENT');

-- CreateEnum
CREATE TYPE "LIKETYPES" AS ENUM ('POST', 'COMMENT');

-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "commentType" "COMMENTTYPES" NOT NULL,
ADD COLUMN     "mentionId" TEXT;

-- AlterTable
ALTER TABLE "like" ADD COLUMN     "likeType" "LIKETYPES" NOT NULL;

-- DropEnum
DROP TYPE "COMMENTSTYPES";

-- DropEnum
DROP TYPE "LIKEDTYPES";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "COMMENTSTYPES" AS ENUM ('POST', 'COMMENT');

-- CreateEnum
CREATE TYPE "LIKEDTYPES" AS ENUM ('POST', 'COMMENT');

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_commentedBy_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_likedBy_fkey";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "likes";

-- DropEnum
DROP TYPE "COMMENTSFOLLOWED";

-- DropEnum
DROP TYPE "LIKEDFOLLOWED";

-- CreateTable
CREATE TABLE "commentPost" (
    "id" TEXT NOT NULL,
    "commentedBy" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "media" TEXT[],
    "commentedOn" "COMMENTSTYPES" NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "commentPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likePost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "likePost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commentPost" ADD CONSTRAINT "commentPost_commentedBy_fkey" FOREIGN KEY ("commentedBy") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentPost" ADD CONSTRAINT "commentPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likePost" ADD CONSTRAINT "likePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likePost" ADD CONSTRAINT "likePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

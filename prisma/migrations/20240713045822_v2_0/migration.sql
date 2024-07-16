/*
  Warnings:

  - The values [GETHIRED,TOHIRE] on the enum `PURPOSE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `commentPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likePost` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PURPOSE_new" AS ENUM ('ENTREPRENEUR', 'STUDENT', 'BUSINESS', 'SERVICE_PROVIDER', 'FREELANCER', 'EMPLOYEE', 'RECRUITER', 'INVESTOR', 'NETWORK');
ALTER TABLE "users" ALTER COLUMN "purpose" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "purpose" TYPE "PURPOSE_new" USING ("purpose"::text::"PURPOSE_new");
ALTER TYPE "PURPOSE" RENAME TO "PURPOSE_old";
ALTER TYPE "PURPOSE_new" RENAME TO "PURPOSE";
DROP TYPE "PURPOSE_old";
ALTER TABLE "users" ALTER COLUMN "purpose" SET DEFAULT 'NETWORK';
COMMIT;

-- DropForeignKey
ALTER TABLE "commentPost" DROP CONSTRAINT "commentPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "commentPost" DROP CONSTRAINT "commentPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "likePost" DROP CONSTRAINT "likePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "likePost" DROP CONSTRAINT "likePost_userId_fkey";

-- DropTable
DROP TABLE "commentPost";

-- DropTable
DROP TABLE "likePost";

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "media" TEXT[],
    "postId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_commentId_fkey";

-- AlterTable
ALTER TABLE "like" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

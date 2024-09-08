/*
  Warnings:

  - You are about to drop the column `tag` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];

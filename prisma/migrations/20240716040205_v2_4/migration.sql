/*
  Warnings:

  - You are about to drop the column `mention` on the `comment` table. All the data in the column will be lost.
  - Added the required column `mentionMail` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "mention",
ADD COLUMN     "mentionMail" TEXT NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

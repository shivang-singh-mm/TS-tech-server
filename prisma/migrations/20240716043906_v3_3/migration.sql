/*
  Warnings:

  - Added the required column `purpose` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `timeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history" ADD COLUMN     "purpose" "PURPOSE" NOT NULL;

-- AlterTable
ALTER TABLE "timeline" ADD COLUMN     "title" TEXT NOT NULL;

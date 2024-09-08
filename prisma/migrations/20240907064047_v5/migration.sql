/*
  Warnings:

  - Added the required column `name` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL;

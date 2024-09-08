/*
  Warnings:

  - The values [POST] on the enum `NOTIFICATIONTYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NOTIFICATIONTYPE_new" AS ENUM ('LIKE', 'COMMENT', 'FOLLOW');
ALTER TABLE "notification" ALTER COLUMN "notificationType" TYPE "NOTIFICATIONTYPE_new" USING ("notificationType"::text::"NOTIFICATIONTYPE_new");
ALTER TYPE "NOTIFICATIONTYPE" RENAME TO "NOTIFICATIONTYPE_old";
ALTER TYPE "NOTIFICATIONTYPE_new" RENAME TO "NOTIFICATIONTYPE";
DROP TYPE "NOTIFICATIONTYPE_old";
COMMIT;

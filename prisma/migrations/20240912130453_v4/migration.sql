/*
  Warnings:

  - The values [BUSINESS,SERVICE_PROVIDER,FREELANCER,NETWORK] on the enum `PURPOSE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PURPOSE_new" AS ENUM ('ENTREPRENEUR', 'STUDENT', 'STARTUP', 'LEGALITIES', 'EMPLOYEE', 'RECRUITER', 'INVESTOR', 'INFLUENCER', 'MARKETING');
ALTER TABLE "users" ALTER COLUMN "purpose" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "purpose" TYPE "PURPOSE_new" USING ("purpose"::text::"PURPOSE_new");
ALTER TABLE "history" ALTER COLUMN "purpose" TYPE "PURPOSE_new" USING ("purpose"::text::"PURPOSE_new");
ALTER TABLE "activity" ALTER COLUMN "sectors" TYPE "PURPOSE_new"[] USING ("sectors"::text::"PURPOSE_new"[]);
ALTER TYPE "PURPOSE" RENAME TO "PURPOSE_old";
ALTER TYPE "PURPOSE_new" RENAME TO "PURPOSE";
DROP TYPE "PURPOSE_old";
ALTER TABLE "users" ALTER COLUMN "purpose" SET DEFAULT 'STUDENT';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "purpose" SET DEFAULT 'STUDENT';

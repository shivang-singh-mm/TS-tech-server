-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

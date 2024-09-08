-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_redirectId_fkey" FOREIGN KEY ("redirectId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "PURPOSE" AS ENUM ('NETWORK', 'GETHIRED', 'TOHIRE');

-- CreateEnum
CREATE TYPE "COMMENTSFOLLOWED" AS ENUM ('POST', 'COMMENT');

-- CreateEnum
CREATE TYPE "LIKEDFOLLOWED" AS ENUM ('POST', 'COMMENT');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT DEFAULT '',
    "phoneCode" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "purpose" "PURPOSE" NOT NULL DEFAULT 'NETWORK',
    "githubURL" TEXT DEFAULT '',
    "linkedInURL" TEXT DEFAULT '',
    "aboutYou" TEXT DEFAULT '',
    "aboutJobTitle" TEXT DEFAULT '',
    "bio" TEXT DEFAULT '',
    "aspirations" TEXT DEFAULT '',
    "profilePic" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "followeeUserId" TEXT NOT NULL,
    "followerUserId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline" (
    "id" TEXT NOT NULL,
    "userRefId" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "description" TEXT NOT NULL,

    CONSTRAINT "timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mediaLink" TEXT[],
    "caption" TEXT NOT NULL,
    "decription" TEXT NOT NULL,
    "tags" TEXT[],
    "landmark" TEXT NOT NULL,
    "postedBy" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "commentedBy" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "media" TEXT[],
    "commentedOn" "COMMENTSFOLLOWED" NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "likedOn" "LIKEDFOLLOWED" NOT NULL,
    "likedBy" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "follow_followeeUserId_followerUserId_key" ON "follow"("followeeUserId", "followerUserId");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followeeUserId_fkey" FOREIGN KEY ("followeeUserId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline" ADD CONSTRAINT "timeline_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commentedBy_fkey" FOREIGN KEY ("commentedBy") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likedBy_fkey" FOREIGN KEY ("likedBy") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

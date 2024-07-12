/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follower` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_FollowerToProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowerToProfile_AB_unique" ON "_FollowerToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowerToProfile_B_index" ON "_FollowerToProfile"("B");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowerToProfile" ADD CONSTRAINT "_FollowerToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Follower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowerToProfile" ADD CONSTRAINT "_FollowerToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Changed the type of `reason` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "reason",
ADD COLUMN     "reason" TEXT NOT NULL;

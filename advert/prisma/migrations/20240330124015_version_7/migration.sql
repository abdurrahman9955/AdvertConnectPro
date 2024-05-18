/*
  Warnings:

  - Added the required column `uploaded_by` to the `ProductMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductMedia" ADD COLUMN     "uploaded_by" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

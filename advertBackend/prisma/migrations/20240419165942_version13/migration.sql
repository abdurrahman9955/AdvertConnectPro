/*
  Warnings:

  - You are about to drop the column `currency` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `shippingMethod` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `ProductOrder` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductOrder" DROP COLUMN "currency",
DROP COLUMN "paymentMethod",
DROP COLUMN "productType",
DROP COLUMN "quantity",
DROP COLUMN "shippingMethod",
DROP COLUMN "status",
DROP COLUMN "totalPrice",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullAddress" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followerCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followingCount" INTEGER NOT NULL DEFAULT 0;

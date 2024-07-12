/*
  Warnings:

  - The `mediaUrl` column on the `ProductBanners` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `productId` on the `ProductImages` table. All the data in the column will be lost.
  - The `mediaUrl` column on the `ProductImages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mediaUrl` column on the `ProductVideos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductBanners" DROP COLUMN "mediaUrl",
ADD COLUMN     "mediaUrl" TEXT[];

-- AlterTable
ALTER TABLE "ProductImages" DROP COLUMN "productId",
DROP COLUMN "mediaUrl",
ADD COLUMN     "mediaUrl" TEXT[];

-- AlterTable
ALTER TABLE "ProductVideos" DROP COLUMN "mediaUrl",
ADD COLUMN     "mediaUrl" TEXT[];

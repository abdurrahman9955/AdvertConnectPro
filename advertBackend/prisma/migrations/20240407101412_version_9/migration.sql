/*
  Warnings:

  - You are about to drop the column `productMediaId` on the `Dislike` table. All the data in the column will be lost.
  - You are about to drop the column `productMediaId` on the `Download` table. All the data in the column will be lost.
  - You are about to drop the column `productMediaId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `productMediaId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `productMediaId` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the `_DislikeToProductBanners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DislikeToProductImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DislikeToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DownloadToProductBanners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DownloadToProductImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DownloadToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToProductBanners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToProductImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToProductBanners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToProductImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductBannersToProductMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductBannersToProductOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductBannersToRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductBannersToShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductImagesToProductMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductImagesToProductOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductImagesToRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductImagesToShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductMediaToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductOrderToProductVideos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVideosToRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVideosToShare` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mediaType` to the `Dislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Dislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Download` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Download` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Share` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_productMediaId_fkey";

-- DropForeignKey
ALTER TABLE "Download" DROP CONSTRAINT "Download_productMediaId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_productMediaId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_productMediaId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_productMediaId_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductBanners" DROP CONSTRAINT "_DislikeToProductBanners_A_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductBanners" DROP CONSTRAINT "_DislikeToProductBanners_B_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductImages" DROP CONSTRAINT "_DislikeToProductImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductImages" DROP CONSTRAINT "_DislikeToProductImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductVideos" DROP CONSTRAINT "_DislikeToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_DislikeToProductVideos" DROP CONSTRAINT "_DislikeToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductBanners" DROP CONSTRAINT "_DownloadToProductBanners_A_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductBanners" DROP CONSTRAINT "_DownloadToProductBanners_B_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductImages" DROP CONSTRAINT "_DownloadToProductImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductImages" DROP CONSTRAINT "_DownloadToProductImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductVideos" DROP CONSTRAINT "_DownloadToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_DownloadToProductVideos" DROP CONSTRAINT "_DownloadToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductBanners" DROP CONSTRAINT "_FavoriteToProductBanners_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductBanners" DROP CONSTRAINT "_FavoriteToProductBanners_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductImages" DROP CONSTRAINT "_FavoriteToProductImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductImages" DROP CONSTRAINT "_FavoriteToProductImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductVideos" DROP CONSTRAINT "_FavoriteToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToProductVideos" DROP CONSTRAINT "_FavoriteToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductBanners" DROP CONSTRAINT "_LikeToProductBanners_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductBanners" DROP CONSTRAINT "_LikeToProductBanners_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductImages" DROP CONSTRAINT "_LikeToProductImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductImages" DROP CONSTRAINT "_LikeToProductImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductVideos" DROP CONSTRAINT "_LikeToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToProductVideos" DROP CONSTRAINT "_LikeToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToProductMedia" DROP CONSTRAINT "_ProductBannersToProductMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToProductMedia" DROP CONSTRAINT "_ProductBannersToProductMedia_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToProductOrder" DROP CONSTRAINT "_ProductBannersToProductOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToProductOrder" DROP CONSTRAINT "_ProductBannersToProductOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToRating" DROP CONSTRAINT "_ProductBannersToRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToRating" DROP CONSTRAINT "_ProductBannersToRating_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToShare" DROP CONSTRAINT "_ProductBannersToShare_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBannersToShare" DROP CONSTRAINT "_ProductBannersToShare_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToProductMedia" DROP CONSTRAINT "_ProductImagesToProductMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToProductMedia" DROP CONSTRAINT "_ProductImagesToProductMedia_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToProductOrder" DROP CONSTRAINT "_ProductImagesToProductOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToProductOrder" DROP CONSTRAINT "_ProductImagesToProductOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToRating" DROP CONSTRAINT "_ProductImagesToRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToRating" DROP CONSTRAINT "_ProductImagesToRating_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToShare" DROP CONSTRAINT "_ProductImagesToShare_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductImagesToShare" DROP CONSTRAINT "_ProductImagesToShare_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductMediaToProductVideos" DROP CONSTRAINT "_ProductMediaToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductMediaToProductVideos" DROP CONSTRAINT "_ProductMediaToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductOrderToProductVideos" DROP CONSTRAINT "_ProductOrderToProductVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductOrderToProductVideos" DROP CONSTRAINT "_ProductOrderToProductVideos_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVideosToRating" DROP CONSTRAINT "_ProductVideosToRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVideosToRating" DROP CONSTRAINT "_ProductVideosToRating_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVideosToShare" DROP CONSTRAINT "_ProductVideosToShare_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVideosToShare" DROP CONSTRAINT "_ProductVideosToShare_B_fkey";

-- AlterTable
ALTER TABLE "Dislike" DROP COLUMN "productMediaId",
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Download" DROP COLUMN "productMediaId",
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "productMediaId",
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "productMediaId",
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductImages" ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "productType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "comment",
DROP COLUMN "mediaId",
ADD COLUMN     "mediaType" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "Share" DROP COLUMN "productMediaId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "sharedUrl" TEXT;

-- DropTable
DROP TABLE "_DislikeToProductBanners";

-- DropTable
DROP TABLE "_DislikeToProductImages";

-- DropTable
DROP TABLE "_DislikeToProductVideos";

-- DropTable
DROP TABLE "_DownloadToProductBanners";

-- DropTable
DROP TABLE "_DownloadToProductImages";

-- DropTable
DROP TABLE "_DownloadToProductVideos";

-- DropTable
DROP TABLE "_FavoriteToProductBanners";

-- DropTable
DROP TABLE "_FavoriteToProductImages";

-- DropTable
DROP TABLE "_FavoriteToProductVideos";

-- DropTable
DROP TABLE "_LikeToProductBanners";

-- DropTable
DROP TABLE "_LikeToProductImages";

-- DropTable
DROP TABLE "_LikeToProductVideos";

-- DropTable
DROP TABLE "_ProductBannersToProductMedia";

-- DropTable
DROP TABLE "_ProductBannersToProductOrder";

-- DropTable
DROP TABLE "_ProductBannersToRating";

-- DropTable
DROP TABLE "_ProductBannersToShare";

-- DropTable
DROP TABLE "_ProductImagesToProductMedia";

-- DropTable
DROP TABLE "_ProductImagesToProductOrder";

-- DropTable
DROP TABLE "_ProductImagesToRating";

-- DropTable
DROP TABLE "_ProductImagesToShare";

-- DropTable
DROP TABLE "_ProductMediaToProductVideos";

-- DropTable
DROP TABLE "_ProductOrderToProductVideos";

-- DropTable
DROP TABLE "_ProductVideosToRating";

-- DropTable
DROP TABLE "_ProductVideosToShare";

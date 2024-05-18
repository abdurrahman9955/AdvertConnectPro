/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductMedia" DROP CONSTRAINT "ProductMedia_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOrder" DROP CONSTRAINT "ProductOrder_productId_fkey";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "product" TEXT,
    "types" TEXT,
    "categories" TEXT,
    "phoneNumber" TEXT,
    "phoneCode" TEXT,
    "price" DECIMAL(65,30),
    "currency" TEXT,
    "country" TEXT,
    "state" TEXT,
    "province" TEXT,
    "city" TEXT,
    "fullAddress" TEXT,
    "emailAddress" TEXT,
    "productName" TEXT,
    "companyLink" TEXT,
    "companyName" TEXT,
    "description" TEXT,
    "mediaType" "MediaType" NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBanners" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "product" TEXT,
    "types" TEXT,
    "categories" TEXT,
    "phoneNumber" TEXT,
    "phoneCode" TEXT,
    "price" DECIMAL(65,30),
    "currency" TEXT,
    "country" TEXT,
    "state" TEXT,
    "province" TEXT,
    "city" TEXT,
    "fullAddress" TEXT,
    "emailAddress" TEXT,
    "productName" TEXT,
    "companyLink" TEXT,
    "companyName" TEXT,
    "description" TEXT,
    "mediaType" "MediaType" NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductBanners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVideos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "product" TEXT,
    "types" TEXT,
    "categories" TEXT,
    "phoneNumber" TEXT,
    "phoneCode" TEXT,
    "price" DECIMAL(65,30),
    "currency" TEXT,
    "country" TEXT,
    "state" TEXT,
    "province" TEXT,
    "city" TEXT,
    "fullAddress" TEXT,
    "emailAddress" TEXT,
    "productName" TEXT,
    "companyLink" TEXT,
    "companyName" TEXT,
    "description" TEXT,
    "mediaType" "MediaType" NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductImagesToProductMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductImagesToProductOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductImagesToRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductImagesToShare" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductBannersToProductMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductBannersToProductOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductBannersToRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductBannersToShare" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductVideosToRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductVideosToShare" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductMediaToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadToProductImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadToProductBanners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikeToProductImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikeToProductBanners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikeToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DislikeToProductImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DislikeToProductBanners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DislikeToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteToProductImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteToProductBanners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductOrderToProductVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductImagesToProductMedia_AB_unique" ON "_ProductImagesToProductMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductImagesToProductMedia_B_index" ON "_ProductImagesToProductMedia"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductImagesToProductOrder_AB_unique" ON "_ProductImagesToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductImagesToProductOrder_B_index" ON "_ProductImagesToProductOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductImagesToRating_AB_unique" ON "_ProductImagesToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductImagesToRating_B_index" ON "_ProductImagesToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductImagesToShare_AB_unique" ON "_ProductImagesToShare"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductImagesToShare_B_index" ON "_ProductImagesToShare"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductBannersToProductMedia_AB_unique" ON "_ProductBannersToProductMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductBannersToProductMedia_B_index" ON "_ProductBannersToProductMedia"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductBannersToProductOrder_AB_unique" ON "_ProductBannersToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductBannersToProductOrder_B_index" ON "_ProductBannersToProductOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductBannersToRating_AB_unique" ON "_ProductBannersToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductBannersToRating_B_index" ON "_ProductBannersToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductBannersToShare_AB_unique" ON "_ProductBannersToShare"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductBannersToShare_B_index" ON "_ProductBannersToShare"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVideosToRating_AB_unique" ON "_ProductVideosToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVideosToRating_B_index" ON "_ProductVideosToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVideosToShare_AB_unique" ON "_ProductVideosToShare"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVideosToShare_B_index" ON "_ProductVideosToShare"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductMediaToProductVideos_AB_unique" ON "_ProductMediaToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductMediaToProductVideos_B_index" ON "_ProductMediaToProductVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadToProductImages_AB_unique" ON "_DownloadToProductImages"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadToProductImages_B_index" ON "_DownloadToProductImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadToProductBanners_AB_unique" ON "_DownloadToProductBanners"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadToProductBanners_B_index" ON "_DownloadToProductBanners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadToProductVideos_AB_unique" ON "_DownloadToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadToProductVideos_B_index" ON "_DownloadToProductVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToProductImages_AB_unique" ON "_LikeToProductImages"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToProductImages_B_index" ON "_LikeToProductImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToProductBanners_AB_unique" ON "_LikeToProductBanners"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToProductBanners_B_index" ON "_LikeToProductBanners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToProductVideos_AB_unique" ON "_LikeToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToProductVideos_B_index" ON "_LikeToProductVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DislikeToProductImages_AB_unique" ON "_DislikeToProductImages"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikeToProductImages_B_index" ON "_DislikeToProductImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DislikeToProductBanners_AB_unique" ON "_DislikeToProductBanners"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikeToProductBanners_B_index" ON "_DislikeToProductBanners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DislikeToProductVideos_AB_unique" ON "_DislikeToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikeToProductVideos_B_index" ON "_DislikeToProductVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToProductImages_AB_unique" ON "_FavoriteToProductImages"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToProductImages_B_index" ON "_FavoriteToProductImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToProductBanners_AB_unique" ON "_FavoriteToProductBanners"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToProductBanners_B_index" ON "_FavoriteToProductBanners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToProductVideos_AB_unique" ON "_FavoriteToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToProductVideos_B_index" ON "_FavoriteToProductVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductOrderToProductVideos_AB_unique" ON "_ProductOrderToProductVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductOrderToProductVideos_B_index" ON "_ProductOrderToProductVideos"("B");

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBanners" ADD CONSTRAINT "ProductBanners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVideos" ADD CONSTRAINT "ProductVideos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToProductMedia" ADD CONSTRAINT "_ProductImagesToProductMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToProductMedia" ADD CONSTRAINT "_ProductImagesToProductMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToProductOrder" ADD CONSTRAINT "_ProductImagesToProductOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToProductOrder" ADD CONSTRAINT "_ProductImagesToProductOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToRating" ADD CONSTRAINT "_ProductImagesToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToRating" ADD CONSTRAINT "_ProductImagesToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToShare" ADD CONSTRAINT "_ProductImagesToShare_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductImagesToShare" ADD CONSTRAINT "_ProductImagesToShare_B_fkey" FOREIGN KEY ("B") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToProductMedia" ADD CONSTRAINT "_ProductBannersToProductMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToProductMedia" ADD CONSTRAINT "_ProductBannersToProductMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToProductOrder" ADD CONSTRAINT "_ProductBannersToProductOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToProductOrder" ADD CONSTRAINT "_ProductBannersToProductOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToRating" ADD CONSTRAINT "_ProductBannersToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToRating" ADD CONSTRAINT "_ProductBannersToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToShare" ADD CONSTRAINT "_ProductBannersToShare_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBannersToShare" ADD CONSTRAINT "_ProductBannersToShare_B_fkey" FOREIGN KEY ("B") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVideosToRating" ADD CONSTRAINT "_ProductVideosToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVideosToRating" ADD CONSTRAINT "_ProductVideosToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVideosToShare" ADD CONSTRAINT "_ProductVideosToShare_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVideosToShare" ADD CONSTRAINT "_ProductVideosToShare_B_fkey" FOREIGN KEY ("B") REFERENCES "Share"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductMediaToProductVideos" ADD CONSTRAINT "_ProductMediaToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductMediaToProductVideos" ADD CONSTRAINT "_ProductMediaToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductImages" ADD CONSTRAINT "_DownloadToProductImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductImages" ADD CONSTRAINT "_DownloadToProductImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductBanners" ADD CONSTRAINT "_DownloadToProductBanners_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductBanners" ADD CONSTRAINT "_DownloadToProductBanners_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductVideos" ADD CONSTRAINT "_DownloadToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadToProductVideos" ADD CONSTRAINT "_DownloadToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductImages" ADD CONSTRAINT "_LikeToProductImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductImages" ADD CONSTRAINT "_LikeToProductImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductBanners" ADD CONSTRAINT "_LikeToProductBanners_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductBanners" ADD CONSTRAINT "_LikeToProductBanners_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductVideos" ADD CONSTRAINT "_LikeToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToProductVideos" ADD CONSTRAINT "_LikeToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductImages" ADD CONSTRAINT "_DislikeToProductImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Dislike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductImages" ADD CONSTRAINT "_DislikeToProductImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductBanners" ADD CONSTRAINT "_DislikeToProductBanners_A_fkey" FOREIGN KEY ("A") REFERENCES "Dislike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductBanners" ADD CONSTRAINT "_DislikeToProductBanners_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductVideos" ADD CONSTRAINT "_DislikeToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Dislike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeToProductVideos" ADD CONSTRAINT "_DislikeToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductImages" ADD CONSTRAINT "_FavoriteToProductImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductImages" ADD CONSTRAINT "_FavoriteToProductImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductBanners" ADD CONSTRAINT "_FavoriteToProductBanners_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductBanners" ADD CONSTRAINT "_FavoriteToProductBanners_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductBanners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductVideos" ADD CONSTRAINT "_FavoriteToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToProductVideos" ADD CONSTRAINT "_FavoriteToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrderToProductVideos" ADD CONSTRAINT "_ProductOrderToProductVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrderToProductVideos" ADD CONSTRAINT "_ProductOrderToProductVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVideos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

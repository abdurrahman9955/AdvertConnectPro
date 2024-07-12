-- AlterTable
ALTER TABLE "ProductVideos" ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "mediaUrl" SET NOT NULL,
ALTER COLUMN "mediaUrl" SET DATA TYPE TEXT;

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `GlobalProduct` table. All the data in the column will be lost.
  - You are about to drop the column `categoryTitle` on the `GlobalProduct` table. All the data in the column will be lost.
  - You are about to drop the column `globalProductItemId` on the `GlobalProductItemVariants` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `GlobalProductItemVariants` table. All the data in the column will be lost.
  - You are about to drop the column `globalProductItemId` on the `LocalProductItem` table. All the data in the column will be lost.
  - You are about to drop the `GlobalProductItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caption` to the `GlobalProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `GlobalProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `GlobalProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GlobalProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `globalProductId` to the `GlobalProductItemVariants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `globalProductVariantId` to the `LocalProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GlobalProductItem" DROP CONSTRAINT "GlobalProductItem_globalProductId_fkey";

-- DropForeignKey
ALTER TABLE "GlobalProductItemVariants" DROP CONSTRAINT "GlobalProductItemVariants_globalProductItemId_fkey";

-- DropForeignKey
ALTER TABLE "LocalProductItem" DROP CONSTRAINT "LocalProductItem_globalProductItemId_fkey";

-- DropIndex
DROP INDEX "LocalProductItem_globalProductItemId_localProductId_key";

-- AlterTable
ALTER TABLE "GlobalProduct" DROP COLUMN "categoryId",
DROP COLUMN "categoryTitle",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GlobalProductItemVariants" DROP COLUMN "globalProductItemId",
DROP COLUMN "productId",
ADD COLUMN     "globalProductId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LocalProduct" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "order" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LocalProductItem" DROP COLUMN "globalProductItemId",
ADD COLUMN     "globalProductVariantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "GlobalProductItem";

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "categoryTitle" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_category_key" ON "ProductCategory"("category");

-- AddForeignKey
ALTER TABLE "GlobalProductItemVariants" ADD CONSTRAINT "GlobalProductItemVariants_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalProduct" ADD CONSTRAINT "GlobalProduct_category_fkey" FOREIGN KEY ("category") REFERENCES "ProductCategory"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProductItem" ADD CONSTRAINT "LocalProductItem_globalProductVariantId_fkey" FOREIGN KEY ("globalProductVariantId") REFERENCES "GlobalProductItemVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

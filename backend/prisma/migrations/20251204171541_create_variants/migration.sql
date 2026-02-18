/*
  Warnings:

  - Added the required column `categoryTitle` to the `GlobalProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caption` to the `GlobalProductItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `NutritionFacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GlobalProductItem" DROP CONSTRAINT "GlobalProductItem_globalProductId_fkey";

-- DropForeignKey
ALTER TABLE "LocalProduct" DROP CONSTRAINT "LocalProduct_cityId_fkey";

-- DropForeignKey
ALTER TABLE "LocalProduct" DROP CONSTRAINT "LocalProduct_globalProductId_fkey";

-- DropForeignKey
ALTER TABLE "LocalProductItem" DROP CONSTRAINT "LocalProductItem_globalProductItemId_fkey";

-- DropForeignKey
ALTER TABLE "LocalProductItem" DROP CONSTRAINT "LocalProductItem_localProductId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurants" DROP CONSTRAINT "Restaurants_cityId_fkey";

-- AlterTable
ALTER TABLE "GlobalProduct" ADD COLUMN     "categoryTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GlobalProductItem" ADD COLUMN     "caption" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NutritionFacts" ADD COLUMN     "weight" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GlobalProductItemVariants" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "variationId" TEXT NOT NULL,
    "globalProductItemId" INTEGER NOT NULL,
    "nutritionFactsId" INTEGER NOT NULL,

    CONSTRAINT "GlobalProductItemVariants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GlobalProductItemVariants_variationId_key" ON "GlobalProductItemVariants"("variationId");

-- AddForeignKey
ALTER TABLE "GlobalProductItemVariants" ADD CONSTRAINT "GlobalProductItemVariants_nutritionFactsId_fkey" FOREIGN KEY ("nutritionFactsId") REFERENCES "NutritionFacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalProductItemVariants" ADD CONSTRAINT "GlobalProductItemVariants_globalProductItemId_fkey" FOREIGN KEY ("globalProductItemId") REFERENCES "GlobalProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalProductItem" ADD CONSTRAINT "GlobalProductItem_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProductItem" ADD CONSTRAINT "LocalProductItem_globalProductItemId_fkey" FOREIGN KEY ("globalProductItemId") REFERENCES "GlobalProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProductItem" ADD CONSTRAINT "LocalProductItem_localProductId_fkey" FOREIGN KEY ("localProductId") REFERENCES "LocalProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProduct" ADD CONSTRAINT "LocalProduct_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProduct" ADD CONSTRAINT "LocalProduct_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurants" ADD CONSTRAINT "Restaurants_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

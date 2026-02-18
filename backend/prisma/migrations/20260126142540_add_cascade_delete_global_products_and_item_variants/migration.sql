/*
  Warnings:

  - A unique constraint covering the columns `[cityId,category]` on the table `LocalCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GlobalProductItemVariants" DROP CONSTRAINT "GlobalProductItemVariants_globalProductId_fkey";

-- DropForeignKey
ALTER TABLE "GlobalProductItemVariants" DROP CONSTRAINT "GlobalProductItemVariants_nutritionFactsId_fkey";

-- DropIndex
DROP INDEX "LocalCategory_cityId_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "LocalCategory_cityId_category_key" ON "LocalCategory"("cityId", "category");

-- AddForeignKey
ALTER TABLE "GlobalProductItemVariants" ADD CONSTRAINT "GlobalProductItemVariants_nutritionFactsId_fkey" FOREIGN KEY ("nutritionFactsId") REFERENCES "NutritionFacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalProductItemVariants" ADD CONSTRAINT "GlobalProductItemVariants_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

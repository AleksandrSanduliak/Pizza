/*
  Warnings:

  - You are about to drop the column `cityId` on the `LocalProduct` table. All the data in the column will be lost.
  - Added the required column `localCategoryId` to the `LocalProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LocalProduct" DROP CONSTRAINT "LocalProduct_cityId_fkey";

-- DropIndex
DROP INDEX "LocalProduct_globalProductId_cityId_key";

-- AlterTable
ALTER TABLE "LocalProduct" DROP COLUMN "cityId",
ADD COLUMN     "localCategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LocalCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "LocalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocalCategory_cityId_id_key" ON "LocalCategory"("cityId", "id");

-- AddForeignKey
ALTER TABLE "LocalProduct" ADD CONSTRAINT "LocalProduct_localCategoryId_fkey" FOREIGN KEY ("localCategoryId") REFERENCES "LocalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalCategory" ADD CONSTRAINT "LocalCategory_category_fkey" FOREIGN KEY ("category") REFERENCES "ProductCategory"("category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalCategory" ADD CONSTRAINT "LocalCategory_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

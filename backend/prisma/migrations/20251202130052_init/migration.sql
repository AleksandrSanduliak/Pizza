-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'User');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateBirth" DATE NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'User',
    "isActivated" BOOLEAN NOT NULL,
    "bonuses" INTEGER NOT NULL,
    "activationLink" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionFacts" (
    "id" SERIAL NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NutritionFacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalProductItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "globalProductId" INTEGER NOT NULL,

    CONSTRAINT "GlobalProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalProduct" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "GlobalProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalProductItem" (
    "id" SERIAL NOT NULL,
    "localProductId" INTEGER NOT NULL,
    "globalProductItemId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "LocalProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalProduct" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "globalProductId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "LocalProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" SERIAL NOT NULL,
    "deliverytime" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LocalProductItem_globalProductItemId_localProductId_key" ON "LocalProductItem"("globalProductItemId", "localProductId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalProduct_globalProductId_cityId_key" ON "LocalProduct"("globalProductId", "cityId");

-- CreateIndex
CREATE UNIQUE INDEX "City_city_key" ON "City"("city");

-- AddForeignKey
ALTER TABLE "GlobalProductItem" ADD CONSTRAINT "GlobalProductItem_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProductItem" ADD CONSTRAINT "LocalProductItem_globalProductItemId_fkey" FOREIGN KEY ("globalProductItemId") REFERENCES "GlobalProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProductItem" ADD CONSTRAINT "LocalProductItem_localProductId_fkey" FOREIGN KEY ("localProductId") REFERENCES "LocalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProduct" ADD CONSTRAINT "LocalProduct_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalProduct" ADD CONSTRAINT "LocalProduct_globalProductId_fkey" FOREIGN KEY ("globalProductId") REFERENCES "GlobalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurants" ADD CONSTRAINT "Restaurants_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

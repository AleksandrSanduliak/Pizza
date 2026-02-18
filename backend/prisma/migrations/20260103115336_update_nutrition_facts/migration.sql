/*
  Warnings:

  - The `fats` column on the `NutritionFacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `proteins` column on the `NutritionFacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `carbs` column on the `NutritionFacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `calories` column on the `NutritionFacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "NutritionFacts" DROP COLUMN "fats",
ADD COLUMN     "fats" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "proteins",
ADD COLUMN     "proteins" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "carbs",
ADD COLUMN     "carbs" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "calories",
ADD COLUMN     "calories" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "weight" SET DEFAULT 0;

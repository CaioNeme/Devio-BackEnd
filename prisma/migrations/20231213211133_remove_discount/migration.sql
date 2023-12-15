/*
  Warnings:

  - You are about to drop the column `discount` on the `Extra` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Extra" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount";

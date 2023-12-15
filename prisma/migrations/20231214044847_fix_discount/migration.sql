/*
  Warnings:

  - You are about to drop the column `discount` on the `extras` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "extras" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "discount";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "discount";

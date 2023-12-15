/*
  Warnings:

  - You are about to drop the column `orderId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `Extra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExtraToItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extras` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `items` table without a default value. This is not possible if the table is not empty.
  - Made the column `note` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ExtraToItem" DROP CONSTRAINT "_ExtraToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExtraToItem" DROP CONSTRAINT "_ExtraToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_productId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "extras" INTEGER NOT NULL,
ADD COLUMN     "products" INTEGER NOT NULL,
ALTER COLUMN "note" SET NOT NULL;

-- DropTable
DROP TABLE "Extra";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "_ExtraToItem";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" VARCHAR(50) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "isAvaiable" BOOLEAN NOT NULL DEFAULT true,
    "selledTimes" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extras" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" VARCHAR(50) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "isAvaiable" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,

    CONSTRAINT "extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientName" VARCHAR(50) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "orderStatus" VARCHAR(50) NOT NULL DEFAULT 'PROCESSING',
    "paymentMethod" VARCHAR(50) NOT NULL,
    "itensId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

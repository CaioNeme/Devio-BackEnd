/*
  Warnings:

  - You are about to drop the `extras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExtraToItem" DROP CONSTRAINT "_ExtraToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExtraToItem" DROP CONSTRAINT "_ExtraToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_orderId_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_productId_fkey";

-- DropTable
DROP TABLE "extras";

-- DropTable
DROP TABLE "itens";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "Product" (
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extra" (
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

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientName" VARCHAR(50) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "orderStatus" VARCHAR(50) NOT NULL DEFAULT 'PROCESSING',
    "paymentMethod" VARCHAR(50) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" VARCHAR(255),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "paidPrice" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExtraToItem" ADD CONSTRAINT "_ExtraToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExtraToItem" ADD CONSTRAINT "_ExtraToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

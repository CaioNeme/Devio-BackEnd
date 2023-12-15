/*
  Warnings:

  - You are about to drop the `extras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "extras";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" "ProductType" NOT NULL,
    "soldTimes" INTEGER NOT NULL DEFAULT 0,
    "image" VARCHAR,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extra" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" "ProductType" NOT NULL,
    "image" VARCHAR,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientName" VARCHAR(50) NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "paymentMethod" "PaidWith" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "note" VARCHAR(255),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "paidPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "extrasId" INTEGER,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_extrasId_fkey" FOREIGN KEY ("extrasId") REFERENCES "Extra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

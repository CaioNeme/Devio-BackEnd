-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BURGUER', 'DRINK', 'DESSERT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'READY', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaidWith" AS ENUM ('CREDITCARD', 'DEBITCARD', 'CASH', 'PIX');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" "ProductType" NOT NULL,
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
    "productType" "ProductType" NOT NULL,
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
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "paymentMethod" "PaidWith" NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" VARCHAR(255),
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "paidPrice" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExtraToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExtraToItem_AB_unique" ON "_ExtraToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ExtraToItem_B_index" ON "_ExtraToItem"("B");

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExtraToItem" ADD CONSTRAINT "_ExtraToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "extras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExtraToItem" ADD CONSTRAINT "_ExtraToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "itens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

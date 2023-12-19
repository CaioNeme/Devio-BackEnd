/*
  Warnings:

  - The values [CREDITCARD,DEBITCARD] on the enum `PaidWith` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isAvaiable` on the `extras` table. All the data in the column will be lost.
  - The `extras` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `itensId` on the `orders` table. All the data in the column will be lost.
  - The `orderStatus` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isAvaiable` on the `products` table. All the data in the column will be lost.
  - Changed the type of `productType` on the `extras` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentMethod` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productType` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaidWith_new" AS ENUM ('CREDIT', 'DEBIT', 'CASH', 'PIX');
ALTER TABLE "orders" ALTER COLUMN "paymentMethod" TYPE "PaidWith_new" USING ("paymentMethod"::text::"PaidWith_new");
ALTER TYPE "PaidWith" RENAME TO "PaidWith_old";
ALTER TYPE "PaidWith_new" RENAME TO "PaidWith";
DROP TYPE "PaidWith_old";
COMMIT;

-- AlterTable
ALTER TABLE "extras" DROP COLUMN "isAvaiable",
DROP COLUMN "productType",
ADD COLUMN     "productType" "ProductType" NOT NULL;

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "note" DROP NOT NULL,
DROP COLUMN "extras",
ADD COLUMN     "extras" INTEGER[];

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "itensId",
ADD COLUMN     "itens" INTEGER[],
DROP COLUMN "orderStatus",
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaidWith" NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "isAvaiable",
DROP COLUMN "productType",
ADD COLUMN     "productType" "ProductType" NOT NULL;

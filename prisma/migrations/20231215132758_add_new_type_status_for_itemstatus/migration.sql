/*
  Warnings:

  - The values [DELIVERED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "ItemStatus" ADD VALUE 'CANCELED';

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PROCESSING', 'READY', 'CANCELED');
ALTER TABLE "Order" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "orderStatus" TYPE "OrderStatus_new" USING ("orderStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "orderStatus" SET DEFAULT 'PROCESSING';
COMMIT;

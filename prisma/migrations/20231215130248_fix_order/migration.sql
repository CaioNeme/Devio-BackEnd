/*
  Warnings:

  - The values [PIX] on the enum `PaidWith` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('TODO', 'DONE');

-- AlterEnum
BEGIN;
CREATE TYPE "PaidWith_new" AS ENUM ('CREDIT', 'DEBIT', 'CASH');
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" TYPE "PaidWith_new" USING ("paymentMethod"::text::"PaidWith_new");
ALTER TYPE "PaidWith" RENAME TO "PaidWith_old";
ALTER TYPE "PaidWith_new" RENAME TO "PaidWith";
DROP TYPE "PaidWith_old";
COMMIT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "orderId" INTEGER,
ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'TODO';

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

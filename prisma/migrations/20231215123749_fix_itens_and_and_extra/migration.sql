/*
  Warnings:

  - You are about to drop the `ExtraOnItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtraOnItem" DROP CONSTRAINT "ExtraOnItem_extraId_fkey";

-- DropForeignKey
ALTER TABLE "ExtraOnItem" DROP CONSTRAINT "ExtraOnItem_itemId_fkey";

-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "itemId" INTEGER;

-- DropTable
DROP TABLE "ExtraOnItem";

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `itemId` on the `Extra` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_itemId_fkey";

-- AlterTable
ALTER TABLE "Extra" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "extraId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

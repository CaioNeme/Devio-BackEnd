/*
  Warnings:

  - You are about to drop the column `extrasId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_extrasId_fkey";

-- AlterTable
ALTER TABLE "Extra" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "extrasId",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_ItemExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemExtras_AB_unique" ON "_ItemExtras"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemExtras_B_index" ON "_ItemExtras"("B");

-- AddForeignKey
ALTER TABLE "_ItemExtras" ADD CONSTRAINT "_ItemExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemExtras" ADD CONSTRAINT "_ItemExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

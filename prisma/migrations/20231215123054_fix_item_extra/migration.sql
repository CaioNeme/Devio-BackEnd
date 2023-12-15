/*
  Warnings:

  - You are about to drop the `_ItemExtras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemExtras" DROP CONSTRAINT "_ItemExtras_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemExtras" DROP CONSTRAINT "_ItemExtras_B_fkey";

-- DropTable
DROP TABLE "_ItemExtras";

-- CreateTable
CREATE TABLE "ExtraOnItem" (
    "itemId" INTEGER NOT NULL,
    "extraId" INTEGER NOT NULL,

    CONSTRAINT "ExtraOnItem_pkey" PRIMARY KEY ("itemId","extraId")
);

-- AddForeignKey
ALTER TABLE "ExtraOnItem" ADD CONSTRAINT "ExtraOnItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnItem" ADD CONSTRAINT "ExtraOnItem_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

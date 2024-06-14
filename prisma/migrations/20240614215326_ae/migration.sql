/*
  Warnings:

  - You are about to drop the column `quantity` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "quantity";

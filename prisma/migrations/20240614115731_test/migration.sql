/*
  Warnings:

  - You are about to drop the column `nameProduct` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `nameUser` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "nameProduct",
DROP COLUMN "nameUser";

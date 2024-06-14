/*
  Warnings:

  - You are about to drop the column `value` on the `Order` table. All the data in the column will be lost.
  - Added the required column `nameProduct` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameUser` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "value",
ADD COLUMN     "nameProduct" TEXT NOT NULL,
ADD COLUMN     "nameUser" TEXT NOT NULL;

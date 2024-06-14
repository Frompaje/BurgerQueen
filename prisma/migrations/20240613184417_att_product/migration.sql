-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_productId_fkey";

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_ProductToRequest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRequest_AB_unique" ON "_ProductToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRequest_B_index" ON "_ProductToRequest"("B");

-- AddForeignKey
ALTER TABLE "_ProductToRequest" ADD CONSTRAINT "_ProductToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRequest" ADD CONSTRAINT "_ProductToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

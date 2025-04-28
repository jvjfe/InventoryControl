/*
  Warnings:

  - Added the required column `payment_method` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "PurchaseItem" ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "payment_method" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "payment_method" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesItem" ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

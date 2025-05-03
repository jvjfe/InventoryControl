/*
  Warnings:

  - You are about to drop the column `sales_id` on the `SalesItem` table. All the data in the column will be lost.
  - Added the required column `sale_id` to the `SalesItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SalesItem" DROP CONSTRAINT "SalesItem_sales_id_fkey";

-- AlterTable
ALTER TABLE "SalesItem" DROP COLUMN "sales_id",
ADD COLUMN     "sale_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "SalesItem" ADD CONSTRAINT "SalesItem_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

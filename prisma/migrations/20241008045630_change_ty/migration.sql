/*
  Warnings:

  - You are about to alter the column `type` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(10))`.

*/
-- AlterTable
ALTER TABLE `invoice` MODIFY `type` ENUM('RECEIVE', 'TRANSFER') NOT NULL DEFAULT 'TRANSFER';

/*
  Warnings:

  - You are about to drop the column `userId` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `bankId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_userId_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `userId`,
    ADD COLUMN `bankId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

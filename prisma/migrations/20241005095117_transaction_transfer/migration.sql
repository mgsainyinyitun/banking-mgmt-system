-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `transferAccountId` INTEGER NULL,
    ADD COLUMN `transferType` ENUM('CASHIN', 'CASHOUT', 'NONE') NOT NULL DEFAULT 'NONE';

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transferAccountId_fkey` FOREIGN KEY (`transferAccountId`) REFERENCES `BankAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

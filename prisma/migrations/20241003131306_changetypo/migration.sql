/*
  Warnings:

  - You are about to drop the column `pileImage` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pileImage`,
    ADD COLUMN `profileImage` VARCHAR(191) NULL;

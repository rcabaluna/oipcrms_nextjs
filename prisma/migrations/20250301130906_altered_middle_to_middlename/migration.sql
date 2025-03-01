/*
  Warnings:

  - You are about to drop the column `middle` on the `tblusers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tblgroup1` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblgroup2` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblgroup3` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbluseraccounts` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblusers` DROP COLUMN `middle`,
    ADD COLUMN `middlename` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

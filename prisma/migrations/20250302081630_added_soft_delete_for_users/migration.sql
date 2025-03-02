-- AlterTable
ALTER TABLE `tblgroup1` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblgroup2` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblgroup3` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbluseraccounts` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tblusers` ALTER COLUMN `updated_at` DROP DEFAULT;

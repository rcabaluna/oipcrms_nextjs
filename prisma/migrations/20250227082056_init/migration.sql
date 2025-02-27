-- CreateTable
CREATE TABLE `tblusers` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `middle` VARCHAR(191) NULL,
    `extension` VARCHAR(191) NULL,
    `position` VARCHAR(191) NOT NULL,
    `group1id` INTEGER NULL,
    `group2id` INTEGER NULL,
    `group3id` INTEGER NULL,
    `is_head` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgroup1` (
    `group1id` INTEGER NOT NULL AUTO_INCREMENT,
    `group1code` VARCHAR(191) NOT NULL,
    `group1name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`group1id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgroup2` (
    `group2id` INTEGER NOT NULL AUTO_INCREMENT,
    `group1id` INTEGER NOT NULL,
    `group2code` VARCHAR(191) NOT NULL,
    `group2name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`group2id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgroup3` (
    `group3id` INTEGER NOT NULL AUTO_INCREMENT,
    `group1id` INTEGER NOT NULL,
    `group2id` INTEGER NOT NULL,
    `group3code` VARCHAR(191) NOT NULL,
    `group3name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`group3id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbluseraccounts` (
    `useraccountid` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbluseraccounts_userid_key`(`userid`),
    UNIQUE INDEX `tbluseraccounts_username_key`(`username`),
    PRIMARY KEY (`useraccountid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblusers` ADD CONSTRAINT `tblusers_group1id_fkey` FOREIGN KEY (`group1id`) REFERENCES `tblgroup1`(`group1id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusers` ADD CONSTRAINT `tblusers_group2id_fkey` FOREIGN KEY (`group2id`) REFERENCES `tblgroup2`(`group2id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusers` ADD CONSTRAINT `tblusers_group3id_fkey` FOREIGN KEY (`group3id`) REFERENCES `tblgroup3`(`group3id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblgroup2` ADD CONSTRAINT `tblgroup2_group1id_fkey` FOREIGN KEY (`group1id`) REFERENCES `tblgroup1`(`group1id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblgroup3` ADD CONSTRAINT `tblgroup3_group1id_fkey` FOREIGN KEY (`group1id`) REFERENCES `tblgroup1`(`group1id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblgroup3` ADD CONSTRAINT `tblgroup3_group2id_fkey` FOREIGN KEY (`group2id`) REFERENCES `tblgroup2`(`group2id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbluseraccounts` ADD CONSTRAINT `tbluseraccounts_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `tblusers`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

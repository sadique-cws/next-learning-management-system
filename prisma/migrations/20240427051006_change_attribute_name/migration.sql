/*
  Warnings:

  - You are about to drop the column `ChapterId` on the `muxdata` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chapterId]` on the table `MuxData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapterId` to the `MuxData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `MuxData_ChapterId_key` ON `muxdata`;

-- AlterTable
ALTER TABLE `muxdata` DROP COLUMN `ChapterId`,
    ADD COLUMN `chapterId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MuxData_chapterId_key` ON `MuxData`(`chapterId`);

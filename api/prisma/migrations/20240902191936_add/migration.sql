/*
  Warnings:

  - You are about to drop the column `original_airdate` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `airdate` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "original_airdate",
ADD COLUMN     "airdate" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL;

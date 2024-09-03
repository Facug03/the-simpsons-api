/*
  Warnings:

  - Added the required column `first_appearance_id` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "first_appearance_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "first_appearance_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "use" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_airdate" TEXT NOT NULL,
    "season" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_name_key" ON "Episode"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_first_appearance_id_fkey" FOREIGN KEY ("first_appearance_id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_first_appearance_id_fkey" FOREIGN KEY ("first_appearance_id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

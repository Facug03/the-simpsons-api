/*
  Warnings:

  - A unique constraint covering the columns `[episode_number]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_first_appearance_ep_id_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_first_appearance_sh_id_fkey";

-- CreateTable
CREATE TABLE "Short" (
    "id" SERIAL NOT NULL,
    "airdate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "synopsis" TEXT NOT NULL,

    CONSTRAINT "Short_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Short_episode_number_key" ON "Short"("episode_number");

-- CreateIndex
CREATE UNIQUE INDEX "Short_name_key" ON "Short"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_episode_number_key" ON "Episode"("episode_number");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_first_appearance_ep_id_fkey" FOREIGN KEY ("first_appearance_ep_id") REFERENCES "Episode"("episode_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_first_appearance_sh_id_fkey" FOREIGN KEY ("first_appearance_sh_id") REFERENCES "Short"("episode_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_first_appearance_ep_id_fkey" FOREIGN KEY ("first_appearance_ep_id") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_first_appearance_sh_id_fkey" FOREIGN KEY ("first_appearance_sh_id") REFERENCES "Short"("id") ON DELETE SET NULL ON UPDATE CASCADE;

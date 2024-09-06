-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "age" INTEGER,
    "birthdate" TEXT,
    "description" TEXT NOT NULL,
    "first_appearance_ep_id" INTEGER,
    "first_appearance_sh_id" INTEGER,
    "gender" "Gender" NOT NULL,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "phrases" TEXT[],
    "portrait_path" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "first_appearance_ep_id" INTEGER,
    "first_appearance_sh_id" INTEGER,
    "image_path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "use" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "airdate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "synopsis" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_name_key" ON "Episode"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_first_appearance_ep_id_fkey" FOREIGN KEY ("first_appearance_ep_id") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_first_appearance_sh_id_fkey" FOREIGN KEY ("first_appearance_sh_id") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "catchphrases" TEXT[],
    "age" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "quotes" TEXT[],
    "portrait_img" TEXT NOT NULL,
    "full_body_image" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

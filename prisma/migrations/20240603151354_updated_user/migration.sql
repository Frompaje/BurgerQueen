/*
  Warnings:

  - You are about to drop the `roleUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "roleUser";

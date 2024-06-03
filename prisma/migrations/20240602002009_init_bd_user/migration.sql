-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

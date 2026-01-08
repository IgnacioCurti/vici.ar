-- CreateTable
CREATE TABLE "Users" (
    "user_id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "UID" UUID,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_UID_key" ON "Users"("UID");

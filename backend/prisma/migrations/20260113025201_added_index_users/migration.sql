/*
  Warnings:

  - You are about to drop the column `start_tune` on the `FreeTime` table. All the data in the column will be lost.
  - Added the required column `start_time` to the `FreeTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FreeTime" DROP COLUMN "start_tune",
ADD COLUMN     "start_time" TIME NOT NULL;

-- CreateIndex
CREATE INDEX "Users_user_id_idx" ON "Users"("user_id");

-- CreateIndex
CREATE INDEX "Users_username_idx" ON "Users"("username");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

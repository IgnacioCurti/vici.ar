-- CreateEnum
CREATE TYPE "EventUserStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'TENTATIVE');

-- CreateTable
CREATE TABLE "Events_Users" (
    "event_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "status" "EventUserStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Events_Users_pkey" PRIMARY KEY ("event_id")
);

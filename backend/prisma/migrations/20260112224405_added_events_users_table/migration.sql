/*
  Warnings:

  - You are about to drop the `Events_Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Events_Users";

-- CreateTable
CREATE TABLE "EventsUsers" (
    "event_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "status" "EventUserStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "EventsUsers_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE INDEX "EventsUsers_event_id_idx" ON "EventsUsers"("event_id");

-- CreateIndex
CREATE INDEX "EventsUsers_user_id_idx" ON "EventsUsers"("user_id");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsUsers" ADD CONSTRAINT "EventsUsers_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsUsers" ADD CONSTRAINT "EventsUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

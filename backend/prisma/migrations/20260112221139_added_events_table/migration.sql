-- CreateTable
CREATE TABLE "Events" (
    "event_id" BIGSERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "game_id" UUID NOT NULL,
    "host_id" BIGINT NOT NULL,
    "schedule_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_game_id_key" ON "Events"("game_id");

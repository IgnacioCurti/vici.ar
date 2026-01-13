-- CreateTable
CREATE TABLE "FreeTime" (
    "free_time_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "day_of_week" INTEGER,
    "specific_date" DATE,
    "start_tune" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "is_recurrent" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "valid_until" DATE,

    CONSTRAINT "FreeTime_pkey" PRIMARY KEY ("free_time_id")
);

-- CreateIndex
CREATE INDEX "FreeTime_user_id_idx" ON "FreeTime"("user_id");

-- CreateIndex
CREATE INDEX "FreeTime_free_time_id_idx" ON "FreeTime"("free_time_id");

-- CreateIndex
CREATE INDEX "FreeTime_specific_date_idx" ON "FreeTime"("specific_date");

-- AddForeignKey
ALTER TABLE "FreeTime" ADD CONSTRAINT "FreeTime_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

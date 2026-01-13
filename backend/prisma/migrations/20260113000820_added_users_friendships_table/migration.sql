-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "UsersRelationships" (
    "relationship_id" BIGSERIAL NOT NULL,
    "status" "RelationshipStatus" NOT NULL,
    "status_timestamp" TIMESTAMP(3) NOT NULL,
    "sender_id" BIGINT NOT NULL,
    "receiver_id" BIGINT NOT NULL,

    CONSTRAINT "UsersRelationships_pkey" PRIMARY KEY ("relationship_id")
);

-- CreateIndex
CREATE INDEX "UsersRelationships_relationship_id_idx" ON "UsersRelationships"("relationship_id");

-- CreateIndex
CREATE INDEX "UsersRelationships_sender_id_idx" ON "UsersRelationships"("sender_id");

-- CreateIndex
CREATE INDEX "UsersRelationships_receiver_id_idx" ON "UsersRelationships"("receiver_id");

-- CreateIndex
CREATE INDEX "UsersRelationships_status_idx" ON "UsersRelationships"("status");

-- AddForeignKey
ALTER TABLE "UsersRelationships" ADD CONSTRAINT "UsersRelationships_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRelationships" ADD CONSTRAINT "UsersRelationships_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

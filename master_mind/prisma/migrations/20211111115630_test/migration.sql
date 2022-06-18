-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "combination" TEXT,
    "user" TEXT NOT NULL,
    "numberOfTries" INTEGER NOT NULL DEFAULT 0,
    "foundCombination" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coupon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slotId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserSlot_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSlot" ("coupon", "createdAt", "id", "slotId", "userId") SELECT "coupon", "createdAt", "id", "slotId", "userId" FROM "UserSlot";
DROP TABLE "UserSlot";
ALTER TABLE "new_UserSlot" RENAME TO "UserSlot";
CREATE UNIQUE INDEX "UserSlot_coupon_key" ON "UserSlot"("coupon");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to alter the column `totalTime` on the `Result` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "participantId" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "avgTime" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Result_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("avgTime", "createdAt", "id", "participantId", "task", "totalTime") SELECT "avgTime", "createdAt", "id", "participantId", "task", "totalTime" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
CREATE UNIQUE INDEX "Result_participantId_task_key" ON "Result"("participantId", "task");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

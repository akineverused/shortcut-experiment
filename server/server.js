import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* =========================
   Создание / получение участника
========================= */
app.post("/api/participants", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const participant = await prisma.participant.upsert({
            where: { email },
            update: {},
            create: { email },
        });

        res.json(participant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/* =========================
   Создание / обновление результата
========================= */
app.post("/api/results", async (req, res) => {
    try {
        const { participantId, task, totalTime, avgTime } = req.body;

        if (!participantId || !task) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await prisma.result.upsert({
            where: {
                participantId_task: {
                    participantId: parseInt(participantId),
                    task,
                },
            },
            update: {
                totalTime,
                avgTime,
                createdAt: new Date(), // обновляем время попытки
            },
            create: {
                participantId: parseInt(participantId),
                task,
                totalTime,
                avgTime,
            },
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/* =========================
   Получение результатов участника
========================= */
app.get("/api/results/participant/:id", async (req, res) => {
    try {
        const results = await prisma.result.findMany({
            where: { participantId: parseInt(req.params.id) },
            orderBy: { createdAt: "desc" }
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
);
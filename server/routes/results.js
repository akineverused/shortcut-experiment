const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/", async (req, res) => {
    try {
        const result = new Result({
            participantId: req.body.participantId,
            task: req.body.task,
            totalTime: req.body.totalTime,
            avgTime: req.body.avgTime
        });

        await result.save();
        res.status(201).json({ message: "Result saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/participant/:id", async (req, res) => {
    try {
        const results = await Result.find({
            participantId: req.params.id
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
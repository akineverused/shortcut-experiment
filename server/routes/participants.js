const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

router.post("/", async (req, res) => {
    try {
        const participant = new Participant({
            email: req.body.email
        });

        await participant.save();
        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
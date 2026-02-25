import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true
    },
    task: { type: String, required: true },
    totalTime: { type: Number, required: true },
    avgTime: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);
export default Result;
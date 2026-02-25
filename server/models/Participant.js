import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Participant = mongoose.model("Participant", ParticipantSchema);
export default Participant;
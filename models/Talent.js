const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    media: [String],
    tags: [String],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Talent", talentSchema);
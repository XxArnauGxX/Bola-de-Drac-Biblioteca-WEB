const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    season: { type: Number, required: true },
    episodeNumber: { type: Number, required: true },
    filePath: { type: String, required: true },
});

module.exports = mongoose.model('Episode', episodeSchema);

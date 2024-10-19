const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    filePath: { type: String, required: true },
    thumbnail: { type: String, required: true } 
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
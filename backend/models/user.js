const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
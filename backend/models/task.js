const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message, error: err });
    }
});

router.post('/', async (req, res) => {   
    const task = new Task({
        date: req.body.date,
        username: req.body.username,
        content: req.body.content,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message, error: err });
    }
});

router.delete('/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        }
        await task.deleteOne();
        res.json({ message: 'Mensagem deletada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err });
    }
});

router.put('/:_id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: req.body.completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarefa não encontrada!' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message, error: err });
    }
});

module.exports = router;
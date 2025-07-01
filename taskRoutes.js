const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const newTask = new Task({ title, description, dueDate });
        await newTask.save();
        res.redirect('/dashboard.html');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Mark task as complete
router.post('/:id/complete', async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, { completed: true });
        res.redirect('/dashboard.html');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).send('Task deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

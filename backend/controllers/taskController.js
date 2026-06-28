const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({
                messasge: "Title is required",
            });
        }
        const task = await Task.create({
            title, description, status, priority, dueDate,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask }
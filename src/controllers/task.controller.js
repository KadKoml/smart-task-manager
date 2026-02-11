const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// GET ALL (only user's tasks) + pagination + filters + search + sort
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { q, status, priority, sort } = req.query;

    const filter = { owner: req.user.id };

    if (status) filter.status = status;            // pending | in_progress | done
    if (priority) filter.priority = priority;      // low | medium | high

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      dueSoon: { dueDate: 1 },
      dueLate: { dueDate: -1 },
      highPriority: { priority: -1 },
    };

    const sortObj = sortMap[sort] || { createdAt: -1 };

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortObj);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// SMART: mark overdue tasks (only user's)
exports.markOverdue = async (req, res) => {
  try {
    const now = new Date();

    const result = await Task.updateMany(
      {
        owner: req.user.id,
        dueDate: { $lt: now },
        status: { $ne: "done" },
      },
      { $set: { status: "in_progress" } }
    );

    res.json({ message: "overdue checked", modified: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};


// UPDATE (only owner)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// DELETE (only owner)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

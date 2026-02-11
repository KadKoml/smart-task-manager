const User = require("../models/User");
const Task = require("../models/Task");

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
};

// Get all tasks (admin sees everything)
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("owner", "username email");
  res.json(tasks);
};

// Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await Task.deleteMany({ owner: user._id });

  res.json({ message: "User and tasks deleted" });
};

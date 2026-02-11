const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markOverdue,
} = require("../controllers/task.controller");

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);

// smart endpoint
router.post("/smart/overdue", markOverdue);

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

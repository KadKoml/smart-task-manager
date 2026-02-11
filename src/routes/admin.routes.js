const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  getAllUsers,
  getAllTasks,
  deleteUser,
} = require("../controllers/admin.controller");

router.use(auth);
router.use(role("admin"));

router.get("/users", getAllUsers);
router.get("/tasks", getAllTasks);
router.delete("/users/:id", deleteUser);

module.exports = router;

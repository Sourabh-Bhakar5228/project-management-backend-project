const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const roleAuth = require("../middleware/roleAuth.middleware");

// User controller will be implemented
const userController = require("../controllers/user.controller");

router.post("/", userController.createUser);
router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, roleAuth(["Admin"]), userController.updateUser);
router.delete("/:id", auth, roleAuth(["Admin"]), userController.deleteUser);

module.exports = router;

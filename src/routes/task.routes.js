const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const roleAuth = require("../middleware/roleAuth.middleware");
const taskController = require("../controllers/task.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *         - assignedTo
 *         - projectId
 *       properties:
 *         title:
 *           type: string
 *           description: Task title
 *         description:
 *           type: string
 *           description: Task description
 *         status:
 *           type: string
 *           enum: [To Do, In Progress, Done]
 *         assignedTo:
 *           type: string
 *           description: User ID assigned to the task
 *         projectId:
 *           type: string
 *           description: Project ID the task belongs to
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  auth,
  roleAuth(["Admin", "Manager"]),
  taskController.createTask
);
router.get("/", auth, taskController.getTasks);
router.get("/:id", auth, taskController.getTaskById);
router.put("/:id", auth, taskController.updateTask);
router.delete(
  "/:id",
  auth,
  roleAuth(["Admin", "Manager"]),
  taskController.deleteTask
);

module.exports = router;

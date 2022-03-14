const express = require("express");
const router = express.Router();
const {verify} = require("./verifyTokens");
const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");

router.param("todoId",verify, getTodoById);

router.get("/todos/",verify, getAllTodos);

router.get("/todo/:todoId/",verify, getTodo);

router.post("/todo/create/",verify, createTodo);

router.put("/todo/:todoId/update",verify, updateTodo);

router.delete("/todo/:todoId/delete",verify, deleteTodo);
module.exports = router;

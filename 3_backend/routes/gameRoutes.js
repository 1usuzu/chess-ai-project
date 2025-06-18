const express = require("express");
const router = express.Router();
const { createGame, makeMove } = require("../controllers/gameController");

router.post("/new", createGame);  // tạo game mới
router.post("/move", makeMove);   // gửi nước đi

module.exports = router;

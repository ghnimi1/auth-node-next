
const express = require("express");
const { login } = require("../controllers/Login");
const { register } = require("../controllers/Register");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
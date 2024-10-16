/**
 * File: userRoutes.js
 * Author: Sunil Balami
 * StudentID: 200578456
 * Date: 2024-10-13
 * Description: handle the certain routes request correctly and passing the request to the controller
 */
const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/middleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword
} = require("../controller/userController");

//registering routes here
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/reset', changePassword)

module.exports = router; //exporting router

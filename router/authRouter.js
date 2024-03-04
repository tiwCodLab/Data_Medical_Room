import express from "express";
import { create } from "../controller/userDBController.js";
import {
  handleLogin,
  handleLogout,
  handleRefreshToken,
} from "../controller/authDBController.js";
let authRouters = express.Router();
authRouters.post("/", handleLogin);
authRouters.get("/", handleLogout);

authRouters.get("/refresh", handleRefreshToken);
authRouters.post("/register", create);
export default authRouters;

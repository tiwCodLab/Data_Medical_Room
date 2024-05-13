import express from "express";
import { list, get, put, getusername } from "../controller/userDBController.js";
import verifyRoles from "../middleware/verifyRoles.js";
import ROLES_LIST from "../config/rolesList.js";
let userRouter = express.Router();
userRouter.get("/", verifyRoles(ROLES_LIST.Admin), list);
userRouter.get(
  "/:username",
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Nurse),
  get
);
userRouter.put(
  "/:username",
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Nurse),
  put
);

userRouter.get("/users/:username", getusername);
export default userRouter;

import express from "express";
import { list, get, put } from "../controller/userDBController.js";
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
export default userRouter;

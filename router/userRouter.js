import express from "express";
import { list, get, put } from "../controller/userDBController.js";
import verifyRoles from "../middleware/verifyRoles.js";
import ROLES_LIST from "../config/rolesList.js";
let router = express.Router();
router.get("/", verifyRoles(ROLES_LIST.Admin), list);
router.get(
  "/:username",
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Owner),
  get
);
router.put("/:username", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Owner), put);
export default router;

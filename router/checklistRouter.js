import express from "express";
import {
  addChecklist,
  getChecklistById,
} from "../controller/cheklistDBController.js";

const ChecklistRouter = express.Router();

ChecklistRouter.post("/", addChecklist);
ChecklistRouter.get("/:id", getChecklistById);

export default ChecklistRouter;

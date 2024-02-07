import express from "express";
import {
  create,
  get,
  put,
  del,
  getById,
} from "../controller/DispensingDBController.js";

const DispensingRouter = express.Router();

// Create a new Diagnosis
DispensingRouter.post("/", create);
DispensingRouter.get("/", get);
DispensingRouter.get("/:id", getById);
DispensingRouter.put("/:id", put);
DispensingRouter.delete("/:id", del);

export default DispensingRouter;

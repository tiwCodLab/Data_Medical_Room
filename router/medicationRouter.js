import express from "express";
import {
  listMedications,
  createMedication,
  getMedication,
  updateMedication,
  deleteMedication,
  reduceMedicationStock,
} from "../controller/medicationDBController.js";

const medicaltionRouter = express.Router();
medicaltionRouter.get("/", listMedications);
medicaltionRouter.post("/", createMedication);
medicaltionRouter.get("/:medication_id", getMedication);
medicaltionRouter.put("/:medication_id", updateMedication);
medicaltionRouter.delete("/:medication_id", deleteMedication);
medicaltionRouter.post("/stock", reduceMedicationStock);

export default medicaltionRouter;

import express from "express";
import {
  listMedications,
  createMedication,
  getMedication,
  updateMedication,
  deleteMedication,
} from "../controller/medicationDBController.js";

const medicaltionRouter = express.Router();

// List all medications
medicaltionRouter.get("/", listMedications);

// Create a new medication
medicaltionRouter.post("/", createMedication);

// Get a specific medication by ID
medicaltionRouter.get("/:medication_id", getMedication);

// Update medication information
medicaltionRouter.put("/:medication_id", updateMedication);

// Delete a medication
medicaltionRouter.delete("/:medication_id", deleteMedication);

export default medicaltionRouter;

import express from "express";
import {
  createDiagnosis,
  listDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "../controller/diagnosisDBController.js";

const DiagnosisRouter = express.Router();

// Create a new Diagnosis
DiagnosisRouter.post("/", createDiagnosis);

// Get a list of all Diagnoses
DiagnosisRouter.get("/", listDiagnosis);

// Get a specific Diagnosis by ID
DiagnosisRouter.get("/:diagnosis_id", getDiagnosis);

// Update a Diagnosis by ID
DiagnosisRouter.put("/:diagnosis_id", updateDiagnosis);

// Delete a Diagnosis by ID
DiagnosisRouter.delete("/:diagnosis_id", deleteDiagnosis);

export default DiagnosisRouter;

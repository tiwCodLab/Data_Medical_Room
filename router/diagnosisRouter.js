import express from "express";
import {
  createDiagnosis,
  listDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
  searchDiagnosis,
} from "../controller/diagnosisDBController.js";

const DiagnosisRouter = express.Router();
DiagnosisRouter.post("/", createDiagnosis);
DiagnosisRouter.get("/search", searchDiagnosis);
DiagnosisRouter.get("/", listDiagnosis);
DiagnosisRouter.get("/:diagnosis_id", getDiagnosis);
DiagnosisRouter.put("/:diagnosis_id", updateDiagnosis);
DiagnosisRouter.delete("/:diagnosis_id", deleteDiagnosis);

export default DiagnosisRouter;

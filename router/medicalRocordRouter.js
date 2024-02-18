import express from "express";
import {
  listMedicalRecords,
  createMedicalRecord,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsByPatientId,
  getDiagnosisSummaryByDateRange,
  getnursingactivitiesSummaryByDateRange,
  getOrganizations,
} from "../controller/medicalRocordDBController.js";

import { reduceMedicationStock } from "../controller/medicationDBController.js";

const medicalRecordRouter = express.Router();

// GET all medical records
medicalRecordRouter.get("/", listMedicalRecords);
medicalRecordRouter.get("/summarydiagnosis", getDiagnosisSummaryByDateRange);
medicalRecordRouter.get(
  "/summarynursingactivities",
  getnursingactivitiesSummaryByDateRange
);
medicalRecordRouter.get("/organizations", getOrganizations);
medicalRecordRouter.get("/:medicalRecord_id", getMedicalRecord);
medicalRecordRouter.post("/", createMedicalRecord);
medicalRecordRouter.put("/:medicalRecord_id", updateMedicalRecord);
medicalRecordRouter.delete("/:medicalRecord_id", deleteMedicalRecord);
medicalRecordRouter.get("/patient/:patientId", getMedicalRecordsByPatientId);

export default medicalRecordRouter;

import express from "express";
import {
  listMedicalRecords,
  createMedicalRecord,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsCount,
} from "../controller/medicalRocordDBController.js";


const medicalRecordRouter = express.Router();

// GET all medical records
medicalRecordRouter.get("/", listMedicalRecords);
medicalRecordRouter.get("/:medicalRecord_id", getMedicalRecord);
medicalRecordRouter.post("/", createMedicalRecord);
medicalRecordRouter.put("/:medicalRecord_id", updateMedicalRecord);
medicalRecordRouter.delete("/:medicalRecord_id", deleteMedicalRecord);

//api สำหรับ นับจำนวนข้อมูล
medicalRecordRouter.get("/count/record", getMedicalRecordsCount);

export default medicalRecordRouter;

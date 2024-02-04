import expres from "express";

import {
  listPatient,
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  searchPatient,
} from "../controller/patientDBController.js";

let patientRouter = expres.Router();
patientRouter.get("/search", searchPatient);
patientRouter.get("/:patient_id", getPatient);
patientRouter.post("/", createPatient);
patientRouter.get("/", listPatient);
patientRouter.put("/:patient_id", updatePatient);
patientRouter.delete("/:patient_id", deletePatient);

export default patientRouter;

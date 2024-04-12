import expres from "express";

import {
  listPatient,
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  searchPatient,
} from "../../controller/PsychologistController/Psychologist_PatientDBController.js";

let psychologist_patientRouter = expres.Router();
psychologist_patientRouter.get("/search", searchPatient);
psychologist_patientRouter.get("/:patient_id", getPatient);
psychologist_patientRouter.post("/", createPatient);
psychologist_patientRouter.get("/", listPatient);
psychologist_patientRouter.put("/:patient_id", updatePatient);
psychologist_patientRouter.delete("/:patient_id", deletePatient);

export default psychologist_patientRouter;

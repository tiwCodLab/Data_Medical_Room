import expres from "express";

import {
  listPatient,
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controller/patientDBController.js";

let patientRouter = expres.Router();
patientRouter.get("/:student_id", getPatient);
patientRouter.post("/", createPatient);
patientRouter.get("/", listPatient);
patientRouter.put("/:student_id", updatePatient);
patientRouter.delete("/:student_id", deletePatient);

export default patientRouter;

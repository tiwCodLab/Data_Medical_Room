import expres from "express";

import {
  createCounselingRecord,
  getAllCounselingRecords,
  getCounselingRecordById,
  updateCounselingRecord,
  deleteCounselingRecord,
  getCounselingByPatientId,
  getCounselingCount,
} from "../../controller/PsychologistController/Psy_counselingRecordDBController.js";

let counselingRouter = expres.Router();
counselingRouter.post("/", createCounselingRecord);
counselingRouter.get("/", getAllCounselingRecords);
counselingRouter.get("/:id", getCounselingRecordById);
counselingRouter.put("/:id", updateCounselingRecord);
counselingRouter.delete("/:id", deleteCounselingRecord);
counselingRouter.get("/patient/:patientId", getCounselingByPatientId);
counselingRouter.get("/count/record", getCounselingCount);

export default counselingRouter;

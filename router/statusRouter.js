import expres from "express";
import {
  listStatus,
  createStatus,
  updateStatus,
  deleteStatus,
  createPatient,
} from "../controller/statusDBController.js";

let statusRouter = expres.Router();
statusRouter.get("/", listStatus);
statusRouter.post("/", createStatus);
statusRouter.post("/patient", createPatient);
statusRouter.put("/:status_id", updateStatus);
statusRouter.delete("/:status_id", deleteStatus);

export default statusRouter;

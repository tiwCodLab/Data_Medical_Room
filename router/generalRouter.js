import express from "express";
import {
  createGenaral,
  getGenaralById,
  getAllGenarals,
  updateGenaral,
  deleteGenaral,
  getGeneralByPatientId,
} from "../controller/generalDBController.js";

const GenaralRouter = express.Router();
GenaralRouter.post("/", createGenaral);
GenaralRouter.get("/", getAllGenarals);
GenaralRouter.get("/:genaral_id", getGenaralById);
GenaralRouter.put("/:genaral_id", updateGenaral);
GenaralRouter.delete("/:genaral_id", deleteGenaral);
GenaralRouter.get("/patient/:patientId", getGeneralByPatientId);

export default GenaralRouter;

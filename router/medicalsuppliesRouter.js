import express from "express";
import {
  listMedicalsupplies,
  createMedicalsupply,
  getMedicalsupply,
  updateMedicalsupply,
  deleteMedicalsupply,
} from "../controller/medicalSuppliesDBController.js";

const medicalSuppliesRouter = express.Router();

// Route to list all medical supplies
medicalSuppliesRouter.get("/", listMedicalsupplies);

// Route to create a new medical supply
medicalSuppliesRouter.post("/", createMedicalsupply);

// Route to get a specific medical supply by ID
medicalSuppliesRouter.get("/:medical_supplies_id", getMedicalsupply);

// Route to update a medical supply by ID
medicalSuppliesRouter.put("/:medical_supplies_id", updateMedicalsupply);

// Route to delete a medical supply by ID
medicalSuppliesRouter.delete("/:medical_supplies_id", deleteMedicalsupply);

export default medicalSuppliesRouter;

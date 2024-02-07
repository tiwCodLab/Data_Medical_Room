import express from "express";
import { create } from "../controller/DispensingDBController.js";

const DispensingRouter = express.Router();

// Create a new Diagnosis
DispensingRouter.post("/", create);

export default DispensingRouter;


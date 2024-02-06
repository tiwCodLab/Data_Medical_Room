import express from "express";
import {
  addSystemReview,
  getAllSystemReviews,
  getSystemReviewById,
  updateSystemReviewById,
  deleteSystemReviewById,
} from "../controller/systemreviewDBController.js";

const SystemRouter = express.Router();
SystemRouter.post("/", addSystemReview);
SystemRouter.get("/", getAllSystemReviews);
SystemRouter.get("/:id", getSystemReviewById);
SystemRouter.put("/:id", updateSystemReviewById);
SystemRouter.delete("/:id", deleteSystemReviewById);

export default SystemRouter;

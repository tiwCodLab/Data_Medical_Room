import express from "express";
import {
  listActivities,
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} from "../controller/activitiesDBController.js";

const ActivitiesRouter = express.Router();

// Get a list of activities
ActivitiesRouter.get("/", listActivities);

// Create a new activity
ActivitiesRouter.post("/", createActivity);

// Get details of a specific activity
ActivitiesRouter.get("/:activities_id", getActivity);

// Update details of a specific activity
ActivitiesRouter.put("/:activities_id", updateActivity);

// Delete a specific activity
ActivitiesRouter.delete("/:activities_id", deleteActivity);

export default ActivitiesRouter;

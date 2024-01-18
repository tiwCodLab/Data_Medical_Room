import expres from "express";
import {
  listOrganization,
  createOrganizations,
  updateOrganization,
  deleteOrganization,
} from "../controller/organizationDBController.js";

let organizationRouter = expres.Router();
organizationRouter.get("/", listOrganization);
organizationRouter.post("/", createOrganizations);
organizationRouter.put("/:organizations_id", updateOrganization);
organizationRouter.delete("/:organizations_id", deleteOrganization);

export default organizationRouter;

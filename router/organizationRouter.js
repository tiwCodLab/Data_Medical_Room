import expres from "express";
import {
  listOrganization,
  createOrganizations,
  updateOrganization,
  deleteOrganization,
  getOrganizationById,
} from "../controller/organizationDBController.js";

let organizationRouter = expres.Router();
organizationRouter.get("/", listOrganization);
organizationRouter.get("/:organizations_id", getOrganizationById);
organizationRouter.post("/", createOrganizations);
organizationRouter.put("/:organizations_id", updateOrganization);
organizationRouter.delete("/:organizations_id", deleteOrganization);

export default organizationRouter;

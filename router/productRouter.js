import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/productController.js";
let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:id", get);
router.put("/:id", put);
router.delete("/:id", remove);
export default router;


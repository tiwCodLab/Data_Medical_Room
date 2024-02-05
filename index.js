import express from "express";
import logger from "morgan";
import * as dotenv from "dotenv";
import * as url from "url";
import mongooseDbConnect from "./config/dbConnect.js";
import cors from "cors";
// cookie acessing
// To allow the browser to set cookies and adhere to Same Origin Policy,

import cookieParser from "cookie-parser";
// authorization
import verifyJWT from "./middleware/verifyJWT.js";
// routers
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import patientRouter from "./router/patientRouter.js";
import statusRouter from "./router/statusRouter.js";
import organizationRouter from "./router/organizationRouter.js";
import medicalRecordRouter from "./router/medicalRocordRouter.js";
import medicaltionRouter from "./router/medicationRouter.js";
import DiagnosisRouter from "./router/diagnosisRouter.js";
import medicalSuppliesRouter from "./router/medicalsuppliesRouter.js";
import ActivitiesRouter from "./router/activitiesRouter.js";
import DispensingRouter from "./router/dispensingRouter.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

mongooseDbConnect();

const app = express();

// กำหนดค่า CORS middleware
app.use(cors());
// custom middleware logger
app.use(logger("short"));
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
//serve static files
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use("/", express.static(__dirname + "/public"));
// routes
app.use("/auth", authRouter); // register, login, logout, refreshToken
// test to verify JWT
app.get("/secret", verifyJWT, (req, res) =>
  res.json({ success: true, message: "Secret Page" })
);
// REST for products or user
app.use("/api/product", productRouter);
app.use("/api/user", verifyJWT, userRouter);
app.use("/api/patient", patientRouter);
app.use("/api/status", statusRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/medicalrecord", medicalRecordRouter);
app.use("/api/medication", medicaltionRouter);
app.use("/api/diagnosis", DiagnosisRouter);
app.use("/api/medicalsupplies", medicalSuppliesRouter);
app.use("/api/activities", ActivitiesRouter);
app.use("/api/dispensing", DispensingRouter);

app.get("/", (req, res) => {
  res.status(401).send({ error: "Invalid Endport" });
});
app.get("*", (req, res) => {
  res.status(404).json(new Error("Not Found Page!" + req.url));
});
// for error handling
app.use((err, req, res, next) => {
  // console.error(`${err.name}: ${err.message}`)
  // res.status(500).send(err.message);
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// make server start listening on a specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

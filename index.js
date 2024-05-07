import express from "express";
import logger from "morgan";
import * as dotenv from "dotenv";
import * as url from "url";
import mongooseDbConnect from "./config/dbConnect.js";
import cors from "cors";
// cookie acessing
import cookieParser from "cookie-parser";
// authorization
import verifyJWT from "./middleware/verifyJWT.js";
// routers
import userRouter from "./router/userRouter.js";
import authRouters from "./router/authRouter.js";
import patientRouter from "./router/patientRouter.js";
import statusRouter from "./router/statusRouter.js";
import organizationRouter from "./router/organizationRouter.js";
import medicalRecordRouter from "./router/medicalRocordRouter.js";
import medicaltionRouter from "./router/medicationRouter.js";
import DiagnosisRouter from "./router/diagnosisRouter.js";
import medicalSuppliesRouter from "./router/medicalsuppliesRouter.js";
import ActivitiesRouter from "./router/activitiesRouter.js";
import DispensingRouter from "./router/dispensingRouter.js";
import ChecklistRouter from "./router/checklistRouter.js";
import SystemRouter from "./router/sysyemreviewRouter.js";
import GenaralRouter from "./router/generalRouter.js";
import psychologist_patientRouter from "./router/psychologistRouter/psy_patientRouter.js";
import counselingRouter from "./router/psychologistRouter/psy_counselingRouter.js";
import AppoinmentRouter from "./router/psychologistRouter/psy_appoinmentRouter.js";

dotenv.config();
const PORT = process.env.PORT;

mongooseDbConnect();

const app = express();

// กำหนดค่า CORS middleware
app.use(
  cors({
    credentials: true,
    // origin: ["https://tu-wellness-center.vercel.app"],
    origin: ["http://localhost:3000"],
  })
);

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
app.use("/auth", authRouters); // register, login, logout, refreshToken
app.use("/api/user", verifyJWT, userRouter);
app.use("/api/patient", verifyJWT, patientRouter);
app.use("/api/status", statusRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/medicalrecord", verifyJWT, medicalRecordRouter);
app.use("/api/medication", medicaltionRouter);
app.use("/api/diagnosis", DiagnosisRouter);
app.use("/api/medicalsupplies", medicalSuppliesRouter);
app.use("/api/activities", ActivitiesRouter);
app.use("/api/dispensing", DispensingRouter);
app.use("/api/checklist", ChecklistRouter);
app.use("/api/review", SystemRouter);
app.use("/api/general", GenaralRouter);

//rest api Psychologis
app.use("/api/psypatient", psychologist_patientRouter);
app.use("/api/counseling", counselingRouter);
app.use("/api/appoinment", AppoinmentRouter);

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

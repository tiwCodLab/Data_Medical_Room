import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const Psychologist_patientSchema = new mongoose.Schema({
  // patient_id: { type: String },
  student_id: { type: String },
  prefix: { type: String },
  patient_fname: { type: String },
  patient_lname: { type: String },
  gender: { type: String },
  year: { type: String },
  status: { type: String },
  organizations: { type: String },
  age: { type: Number },
  email: { type: String },
  phonenumber: { type: String },
});

let Psychologist_Patient = mongoose.model(
  "Psychologist_Patient",
  Psychologist_patientSchema,
  "psychologist_patients"
);

export default Psychologist_Patient;

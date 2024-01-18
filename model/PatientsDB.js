import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const patientSchema = new mongoose.Schema({
  patient_id: { type: String, require: true },
  student_id: { type: Number },
  patient_fname: { type: String, require: true },
  patient_lname: { type: String, require: true },
  status: { type: String },
  organizations: { type: String },
  age: { type: Number },
});

patientSchema.method.toProfileJSON = function () {
  return {
    student_id: this.student_id,
    patient_fname: this.patient_fname,
    patient_lname: this.patient_lname,
    status: this.status,
    organizations: this.organizations,
    age: this.age,
  };
};

let Patient = mongoose.model("Patient", patientSchema, "patients");

export default Patient;

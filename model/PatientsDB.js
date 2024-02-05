import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const patientSchema = new mongoose.Schema({
  patient_id: { type: String },
  student_id: { type: String },
  prefix: { type: String },
  patient_fname: { type: String },
  patient_lname: { type: String },
  status: { type: String },
  organizations: { type: String },
  // status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  // organizations: { type: mongoose.Schema.Types.ObjectId, ref: "Organizations" },
  age: { type: Number, required: true },
});

patientSchema.method.toProfileJSON = function () {
  return {
    student_id: this.student_id,
    prefix: this.prefix,
    patient_fname: this.patient_fname,
    patient_lname: this.patient_lname,
    status: this.status,
    organizations: this.organizations,
    age: this.age,
  };
};

let Patient = mongoose.model("Patient", patientSchema, "patients");

export default Patient;

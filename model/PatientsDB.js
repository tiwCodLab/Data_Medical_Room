import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const patientSchema = new mongoose.Schema({
  student_id: { type: String },
  patient_id: { type: String },
  prefix: { type: String },
  patient_fname: { type: String },
  patient_lname: { type: String },
  status: { type: String },
  organizations: { type: String },
  birthday: { type: String },
  age: { type: Number },
  email: { type: String },
  phonenumber: { type: String },

  allergy_medicine: { type: String },
  allergy_medicine_detail: { type: String },
  allergy_food: { type: String },
  allergy_food_detail: { type: String },
  smoking_status: { type: String },
  smoking_status_detail: { type: String },
  alcohol_consumption: { type: String },
  alcohol_consumption_detail: { type: String },
  other_substance: { type: String },
  other_substance_detail: { type: String },
  weight: { type: Number },
  height: { type: Number },
  body_temperature: { type: Number },
  heart_rate: { type: Number },
  respiratory_rate: { type: Number },
  blood_pressure: { type: Number },
  Last_edited: { type: String },
  edited_by: { type: String },
});

// patientSchema.method.toProfileJSON = function () {
//   return {
//     student_id: this.student_id,
//     prefix: this.prefix,
//     patient_fname: this.patient_fname,
//     patient_lname: this.patient_lname,
//     status: this.status,
//     organizations: this.organizations,
//     age: this.age,
//     birthday: this.birthday,
//     email: this.email,
//     phonenumber: this.phonenumber,

//   };
// };

let Patient = mongoose.model("Patient", patientSchema, "patients");

export default Patient;

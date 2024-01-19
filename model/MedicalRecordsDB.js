import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const medicalRecordSchema = new mongoose.Schema({
  medicalRecord_id: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  allergy_to_medicine: { type: String },
  food_allergy: { type: String },
  alcohol_consumption: { type: String },
  substance_abuse: { type: String },
  weight: { type: Number },
  height: { type: Number },
  body_temperature: { type: Number },
  heart_rate: { type: Number },
  respiratory_rate: { type: Number },
  blood_pressure: { type: Number },
  chief_complaint: { type: String },
  physical_exam: { type: String },
  diagnosis: { type: String },
  nursing_activities: { type: String },
  recommendations: { type: String },
  medication_prescription: { type: String },
  medical_supplies: { type: String },
  remarks: { type: String },
});

let MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

export default MedicalRecord;

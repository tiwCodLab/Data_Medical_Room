import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const medicalRecordSchema = new mongoose.Schema({
  medicalRecord_id: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  visittime: { type: String },
  visitdate: { type: String },
  doctor: { type: String },
  chief_complaint: { type: String },
  physical_exam: { type: String },
  diagnosis: { type: String },
  nursing_activities: { type: String },
  recommendations: { type: String },
  medication_prescription: { type: String },
  qty: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  medical_supplies: { type: String },
  remarks: { type: String },
});

let MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

export default MedicalRecord;

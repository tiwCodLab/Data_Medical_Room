import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const medicalRecordSchema = new mongoose.Schema({
  medicalRecord_id: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  // doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visittime: { type: String },
  visitdate: { type: String },
  doctor: { type: String },
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
  chief_complaint: { type: String },
  physical_exam: { type: String },
  diagnosis: { type: String },
  nursing_activities: { type: String },
  recommendations: { type: String },
  medication_prescription: { type: String },
  dispensingItems: [
    {
      qty: Number,
      unitPrice: Number,
      medicationRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication",
      },
      subtotal: Number,
    },
  ],
  total: Number,
  medical_supplies: { type: String },
  remarks: { type: String },
});

let MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

export default MedicalRecord;

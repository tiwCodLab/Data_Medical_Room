import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const generaldSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
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
});

let Genaral = mongoose.model("Genaral", generaldSchema, "genarals");

export default Genaral;

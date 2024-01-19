import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let diagnosisSchema = mongoose.Schema({
  diagnosis_id: { type: String },
  diagnosis_name: { type: String },
});

let Diagnosis = mongoose.model("Diagnosis", diagnosisSchema, "diagnosis");
export default Diagnosis;

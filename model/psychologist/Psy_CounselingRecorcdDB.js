import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const CounselingSchema = new mongoose.Schema({
  id: { type: Number },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  visittime: { type: String },
  visitdate: { type: String },
  psychologist: { type: String },
  format: { type: String },
  firstproblems: { type: String },
  problems: { type: String },
  behavior: { type: String },
  counseling_result: { type: String },
  counseling_plan: { type: String },
  assistance: { type: String },
  form_2q: { type: String },
  form_9q: { type: String },
  form_8q: { type: String },
  form_st_5: { type: String },
  form_gad: { type: String },
  remarks: { type: String },
  appointment_date: { type: String },
  appointment_time: { type: String },
});

let CounselingRecord = mongoose.model(
  "CounselingRecord",
  CounselingSchema,
  "counselingRecord"
);

export default CounselingRecord;

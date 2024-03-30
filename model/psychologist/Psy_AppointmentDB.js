import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const AppoinmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  counseling_recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CounselingRecord",
  },
  appointment_date: { type: String },
  appointment_time: { type: String },
  status: { type: Boolean },
});

let Appoinment = mongoose.model("Appoinment", AppoinmentSchema, "appoinment");

export default Appoinment;

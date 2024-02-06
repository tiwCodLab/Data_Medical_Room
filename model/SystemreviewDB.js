import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let systemreviewShema = mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  skin: String,
  skin_detail: String,
  head: String,
  head_detail: String,
  face: String,
  face_detail: String,
  eye: String,
  eye_detail: String,
  mouth: String,
  mouth_detail: String,
  tongue: String,
  tongue_detail: String,
  throat: String,
  throat_detail: String,
  neck: String,
  neck_detail: String,
  yellow_gland: String,
  yellow_gland_detail: String,
  breast: String,
  breast_detail: String,
  circulatory_system: String,
  circulatory_system_detail: String,
  abdominal: String,
  abdominal_detail: String,
  reproductive_system: String,
  reproductive_system_detail: String,
  muscular_system: String,
  muscular_system_detail: String,
  nervous_system: String,
  nervous_system_detail: String,
});

let SystemReview = mongoose.model(
  "SystemReview",
  systemreviewShema,
  "systemseview"
);
export default SystemReview;

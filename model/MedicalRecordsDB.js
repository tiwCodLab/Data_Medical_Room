import * as mongooseDef from "mongoose";

let mongoose = mongooseDef.default;

const medicalRecordSchema = new mongoose.Schema({
  medicalRecord_no: { type: Number },
  medicalRecord_id: { type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  visittime: { type: String },
  visitdate: { type: String },
  doctor: { type: String },
  skin_color: { type: String },
  skin_color_detail: { type: String },
  chest_size: { type: String },
  chest_size_detail: { type: String },

  breathingRate: { type: String },
  breathingRate_detail: { type: String },
  lungTube: { type: String },
  lungTube_detail: { type: String },
  ribCage: { type: String },
  ribCage_detail: { type: String },
  chestExpansion: { type: String },
  chestExpansion_detail: { type: String },
  abnormalBreathSounds: { type: String },
  abnormalBreathSounds_detail: { type: String },

  yellow_gland: { type: String },
  yellow_gland_detail: { type: String },
  breathing_sound: { type: String },
  breathing_sound_detail: { type: String },
  mouth_and_throat: { type: String },
  mouth_and_throat_detail: { type: String },
  abdominal_appearance: { type: String },
  abdominal_appearance_detail: { type: String },
  intestinal_movement_sound: { type: String },
  intestinal_movement_sound_detail: { type: String },
  abdominal_wall_sound: { type: String },
  abdominal_wall_sound_detail: { type: String },
  abdominal_surface: { type: String },
  abdominal_surface_detail: { type: String },
  skin: { type: String },
  skin_detail: { type: String },
  head: { type: String },
  head_detail: { type: String },
  face: { type: String },
  face_detail: { type: String },
  eyes: { type: String },
  eyes_detail: { type: String },
  mouth: { type: String },
  mouth_detail: { type: String },
  tongue: { type: String },
  tongue_detail: { type: String },
  throat: { type: String },
  throat_detail: { type: String },
  neck: { type: String },
  neck_detail: { type: String },
  thyroid: { type: String },
  thyroid_detail: { type: String },
  breasts: { type: String },
  breasts_detail: { type: String },
  chest: { type: String },
  chest_detail: { type: String },
  circulatory_system: { type: String },
  circulatory_system_detail: { type: String },
  abdomen: { type: String },
  abdomen_detail: { type: String },
  reproductive_system: { type: String },
  reproductive_system_detail: { type: String },
  musculoskeletal_system: { type: String },
  musculoskeletal_system_detail: { type: String },
  nervous_system: { type: String },
  nervous_system_detail: { type: String },
  chief_complaint: { type: String },
  physical_exam: { type: String },
  diagnosis: { type: String },
  nursing_activities: { type: String },
  recommendations: { type: String },
  form_2q_1: { type: String },
  form_2q_2: { type: String },
  medications_dis: [
    {
      medical_name: { type: String },
      qty: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  ],
  total_price_medications: { type: Number },
  medical_supplies: [
    {
      supplies_name: { type: String },
      qty: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  ],
  total_price_supplies: { type: Number },
  forwarding: { tyep: String },
  remarks: { type: String },
});

let MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

export default MedicalRecord;

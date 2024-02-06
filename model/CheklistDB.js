import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let cheklistsShema = mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  skin_color: String,
  skin_color_detail: String,
  chest_size: String,
  chest_size_detail: String,
  yellow_gland: String,
  yellow_gland_detail: String,
  breathing_sound: String,
  breathing_sound_detail: String,
  mouth_and_throat: String,
  mouth_and_throat_detail: String,
  abdominal_appearance: String,
  abdominal_appearance_detail: String,
  intestinal_movement_sound: String,
  intestinal_movement_sound_detail: String,
  abdominal_wall_sound: String,
  abdominal_wall_sound_detail: String,
  abdominal_surface: String,
  abdominal_surface_detail: String,
});

let Checklist = mongoose.model("Checklist", cheklistsShema, "checklist");
export default Checklist;

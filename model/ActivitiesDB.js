import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let activitiesShema = mongoose.Schema({
  activities_id: { type: String },
  activities_name: { type: String },
});

let Activities = mongoose.model("Activities", activitiesShema, "activities");
export default Activities;

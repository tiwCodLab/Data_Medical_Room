import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let medicationsSchema = new mongoose.Schema({
  medication_id: { type: String },
  medication_name: { type: String },
  unit: { type: String },
  price: { type: Number },
  properties: { type: String },
  quantity: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
});

let Medication = mongoose.model("Medication", medicationsSchema, "medications");

export default Medication;

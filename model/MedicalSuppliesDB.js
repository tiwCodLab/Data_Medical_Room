import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

let medicalsuppliesShema = new mongoose.Schema({
  medical_supplies_id: { type: String },
  medical_supplies_name: { type: String },
  unit: { type: String },
  price: { type: Number },
  stock: { type: Number },
  properties: { type: String },
});

let Medicalsupplies = mongoose.model(
  "Medicalsupplie",
  medicalsuppliesShema,
  "medicalsupplies"
);

export default Medicalsupplies;

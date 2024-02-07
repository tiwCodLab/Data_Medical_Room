import mongoose from "mongoose";

const DispensingSchema = new mongoose.Schema({
  orderNo: String,
  dispensingItems: [
    {
      qty: Number,
      unitPrice: Number,
      medicationRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication",
      },
      subtotal: Number,
    },
  ],
  total: Number,
});

const Dispensing = mongoose.model("Dispensing", DispensingSchema, "dispensing");
export default Dispensing;

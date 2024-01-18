import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const statusSchema = new mongoose.Schema({
  status_id: { type: String },
  status_name: { type: String },
});

statusSchema.method.toProfileJSON = function () {
    return {
        status_id : this.status_id,
        status_name : this.name
    }
}

let Status = mongoose.model("Status",statusSchema,"status");

export default  Status;
import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const organizationsSchema = new mongoose.Schema({
  organizations_id: { type: String },
  organizations_name: { type: String },
});

organizationsSchema.method.toProfileJSON = function () {
  return {
    organizations_id: this.organizations_id,
    organizations_name: this.organizations_name,
  };
};

let Organizations = mongoose.model(
  "Organizations",
  organizationsSchema,
  "organizations"
);

export default Organizations;

import * as mongooseDef from "mongoose";
import { validatorUsername } from "../util/util.js";
let mongoose = mongooseDef.default;
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: {
    type: String,
    required: true,
    validate: {
      validator: validatorUsername,
      message: (props) => `${props.value} is not a valid username!`,
    },
    unique: [true, "Must be uniqued"],
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: true,
    minLength: [40], // bcrypt hash binary size is 40+
  },
  roles: {
    Psychologist: { type: Number },
    Nurse: { type: Number },
    Admin: { type: Number },
  },
  refreshToken: { type: String },
  bio: { type: String, required: false },
});

userSchema.methods.toProfileJSON = function () {
  return {
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username,
    roles: this.roles,
  };
};
userSchema.statics.findByRefreshToken = async function (refreshToken) {
  return await this.findOne({ refreshToken });
};
let User = mongoose.model("User", userSchema, "users");

export default User;

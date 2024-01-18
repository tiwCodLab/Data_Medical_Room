import User from "../model/UserDB.js";
import bcrypt from "bcrypt";

export const list = async (req, res) => {
  const result = await User.find()
    .sort({ name: 1 })
    .select(["_id", "firstname", "lastname", "username", "roles"])
    .exec();
  return res.json(result);
};
// add new user
export const create = async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  if (!username || !firstname || !lastname || !password)
    return res
      .status(400)
      .json({ message: "Username, name, and password are required." });
  // check for duplicate username in the db
  try {
    const duplicate = await User.findOne({ username: username });
    if (duplicate) return res.sendStatus(409); // Conflict
  } catch (error) {
    console.log("New user: " + JSON.stringify(error));
  }
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await User.create({ ...req.body, password: hashedPwd });
    console.log(result);
    res.status(201).json({ success: `New user ${firstname} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Find a single user with username
export const get = async (req, res) => {
  const username = req.params.username;

  try {
    // ค้นหาข้อมูลผู้ใช้โดยใช้ username
    const user = await User.findOne({ username });

    // ตรวจสอบว่ามีผู้ใช้ที่มี username ที่ระบุหรือไม่
    if (!user) {
      return res.status(404).json({
        error: "User not found with username " + username,
      });
    }

    // ส่งข้อมูลผู้ใช้ทั้งหมดกลับไปเป็น JSON response
    return res.status(200).json(user.toProfileJSON());
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการค้นหาข้อมูล
    return res.status(500).json({
      error: "Error retrieving user with username " + username,
    });
  }
};

// Update a user identified by the username in the request
export const put = async (req, res) => {
  // Validate Request
  const data = req.body || {};
  if (!data || !req.params.username)
    return res.status(422).send({ error: "username must be alphanumeric." });
  // if update password, hash the password before save
  if (req.body.password) {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPwd;
  }
  // Find User and update it with the request body
  try {
    const foundUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      {
        upsert: false,
        returnOriginal: false,
      }
    );
    if (!foundUser) {
      return res.status(404).send({
        error: "User not found with username " + req.params.username,
      });
    }
    return res.json(foundUser);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        error: "User not found with username " + req.params.username,
      });
    }
    return res.status(500).send({
      error: "Error updating User with username " + req.params.username,
    });
  }
};

// Delete a user identified by the username in the request
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });

    if (!deletedUser) {
      return res.status(404).send({
        error: "User not found with username " + req.params.username,
      });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        error: "User not found with username " + req.params.username,
      });
    }
    return res.status(500).send({
      error: "Error deleting User with username " + req.params.username,
    });
  }
};

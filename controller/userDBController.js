import User from "../model/UserDB.js";
import ROLES_LIST from "../config/rolesList.js";
import bcrypt from "bcrypt";

// Find a single user with username
export const getusername = (req, res) => {
  const username = req.params.username; // Extract the username from the request parameters
  User.findOne({ username: username }) // Use findOne method to find the user with the provided username
    .then((user) => {
      if (!user) {
        // If user not found, return a 404 error
        return res.status(404).send({
          error: "User not found with username " + username,
        });
      }
      res.json(user.toProfileJSON()); // If user found, return the user data
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Error retrieving user with username " + username,
      });
    });
};

export const list = async (req, res) => {
  try {
    const userData = await User.find()
      .sort({ name: 1 })
      .select(["_id", "firstname", "lastname", "username", "roles"])
      .exec();
    return res.json(userData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// add new user
export const create = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  if (!firstname || !lastname || !username || !password)
    return res
      .status(400)
      .json({ message: "username, name and password are required." });
  // check for duplicate username in the db
  try {
    const duplicate = await User.findOne({ username: username });
    if (duplicate) return res.sendStatus(409); //Conflict
  } catch (error) {
    console.log("New user: " + JSON.stringify(error));
  }
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store the new user
    const result = await User.create({ ...req.body, password: hashedPwd });
    console.log(result);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Find a single user with username
export const get = (req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: "User not found with username " + username,
        });
      }
      res.json(user.toProfileJSON()); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Error retrieving user with username " + username,
      });
    });
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
  if (
    (req.body.roles && !req.roles?.Admin) ||
    req.roles.Admin !== ROLES_LIST.Admin
  ) {
    // not allow to change the roles if user has no Admin role
    console.log("eliminate the role update -- not allowed");
    delete req.body.roles;
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({
        error: "Nothing to be updated for " + req.params.username,
      });
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

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

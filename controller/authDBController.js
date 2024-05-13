import User from "../model/UserDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const signToken = (username, firstname, roles) => {
  return jwt.sign(
    {
      UserInfo: {
        username: username,
        firstname: firstname,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h", // 60min
    }
  );
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username and password are required." });
  let foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(404).send({
      error: "User not found with username " + username,
    });
  }
  // evaluate password
  const match = await bcrypt.compare(password, foundUser?.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean); // short form of .filter(item => Boolean(item))
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          firstname: foundUser.firstname,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d", // 60min
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_TIME
          ? process.env.REFRESH_TOKEN_TIME
          : "1d",
      }
    );
    // Saving refreshToken with current user
    await User.findOneAndUpdate(
      { username },
      { refreshToken }, // Save refreshToken to appropriate field
      {
        upsert: false, // Make this update into an upsert
      }
    );
    // Creates Secure Cookie with refresh token
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    //   path: "/",
    //   maxAge: 24 * 60 * 60 * 1000, // should equal to the server's refresh token time
    // });
    // Send authorization roles and access token to user

    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  // Is refreshToken in db?
  let foundUser = {};
  try {
    foundUser = await User.findByRefreshToken(refreshToken);
    if (!foundUser) throw "Not found this refresh token" + refreshToken;
  } catch (error) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
      maxAge: 0,
    });
    return res.sendStatus(204);
  }
  // Delete refreshToken in db
  const result = await User.findOneAndUpdate(
    { username: foundUser.username },
    { refreshToken: "" },
    {
      upsert: true, // Make this update into an upsert
    }
  );
  console.log("Logout: ", result);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 0,
  });
  res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await User.findByRefreshToken(refreshToken);
    if (foundUser) {
      // Evaluate JWT
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || foundUser.username !== decoded.username)
            return res.sendStatus(403);
          // Refresh Token is valid, generate new Access Token
          const roles = Object.values(foundUser.roles);
          const accessToken = signToken(
            decoded.username,
            foundUser.firstname,
            roles
          );
          res.json({ roles, accessToken });
        }
      );
    } else {
      // No user found with the given Refresh Token
      return res.sendStatus(403); //"Error Unauthorized"
    }
  } catch (error) {
    console.error("Error handling refresh token:", error);
    return res.status(403).send("Error Unauthorized"); //"Error Unauthorized"
  }
};

// const handleRefreshToken = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(401);
//   const refreshToken = cookies.jwt;
//   try {
//     const foundUser = await User.findByRefreshToken(refreshToken);
//     if (foundUser) {
//       // evaluate jwt
//       jwt.verify(
//         refreshToken,

//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decoded) => {
//           if (err || foundUser.username !== decoded.username)
//             return res.sendStatus(403);
//           const roles = Object.values(foundUser.roles);
//           const accessToken = signToken(
//             decoded.username,
//             foundUser.firstname,
//             roles
//           );
//           res.json({ roles, accessToken });
//         }
//       );
//     } else return res.status(403).send(error); //"Error Unauthorized"
//   } catch (error) {
//     return res.status(403).send(error); //"Error Unauthorized"
//   } //Forbidden
// };
export { handleLogin, handleLogout, handleRefreshToken };

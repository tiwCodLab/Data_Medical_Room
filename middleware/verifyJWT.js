import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("A token required for authentication"); //invalid token
    req.username = decoded.UserInfo.username;
    req.firstname = decoded.UserInfo.firstname;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

export default verifyJWT;

// import jwt from "jsonwebtoken";
// import User from "../model/UserDB.js";

// const verifyJWT = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const authToken = authHeader && authHeader.split(" ")[1];

//   if (!authToken) {
//     return res
//       .status(401)
//       .json({ message: "A token is required for authentication" });
//   }

//   try {
//     const user = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
//     const recheckUser = await User.findOne({
//       username: user.UserInfo.username,
//     });

//     if (!recheckUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = recheckUser;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// export default verifyJWT;
